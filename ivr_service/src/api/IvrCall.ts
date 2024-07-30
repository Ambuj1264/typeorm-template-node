import { Request, Response } from "express";
import { IvrServices } from "./services/ivrServices";
import { AssignedServices } from "../database/entity/assignedServices";

export const IVRCallService = async (app: any) => {
  app.post("/validate_caller_id", async (req: Request, res: Response) => {
    const { from_number } = req.body;
    try {
      const response = await IvrServices.Validate_caller_id(from_number as any);
      if (response) {
        res.status(200).json({
          message: "Success",
          person: {
            name: response?.firstName + " " + response?.lastName,
            lang: response?.clientIvrLanguage?.lang,
            voice: response?.clientIvrLanguage?.voice,
            gender: response.clientIvrLanguage?.gender,
          },
        });
      } else {
        res.status(200).json({
          message: "Error",
          person: {
            name: "No User",
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/is_active_visit", async (req: Request, res: Response) => {
    const { client_id, from_number } = req.body;
    const status = "inProgress";
    try {
      const response = await IvrServices.Is_active_visit(
        client_id as string,
        status as string,
        from_number as string
      );

      if (response && response.length) {
        const findClientId = await AssignedServices.findOne({
          where: {
            id: response[0].assignedServiceId,
          },
        });
        res.status(200).json({
          message: "Success",
          service_id: response[0].assignedServiceId,
          client_id: findClientId?.clientId,
        });
      } else {
        res.status(200).json({
          message: "Error",
          client_id: client_id,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/validate_passcode", async (req: Request, res: Response) => {
    const { from_number, pass_code, client_id } = req.body;
    try {
      const response = await IvrServices.Validate_passcode(
        from_number as any,
        pass_code as any,
        client_id as any
      );
      if (response) {
        response.passcode == pass_code
          ? res.status(200).json({
              message: "Success",
              person: {
                id: response?.id,
              },
            })
          : errorResponse(res);
      } else {
        errorResponse(res);
      }
    } catch (error) {
      console.error(error);
    }
  });
  const errorResponse = (res: Response) => {
    res.status(200).json({
      message: "Error",
      passcode: {
        value: "Invalid passcode",
        audio_message: "",
      },
    });
  };

  app.post("/is_a_visit_approver", async (req: Request, res: Response) => {
    const { emp_id } = req.body;
    try {
      const response = await IvrServices.Is_a_visit_approver(emp_id as any);

      if (response && response.length) {
        res.status(200).json({
          message: "Success",
          is_approver: 1,
        });
      } else {
        res.status(200).json({
          message: "Error",
          is_approver: 0,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/get_client_names", async (req: Request, res: Response) => {
    const { from_number } = req.body;
    try {
      const response = await IvrServices.Get_Clients_Names(from_number);
      if (response) {
        let obj: any = {};
        let audio_message = `There are ${response.length} client available for service at this location  `;
        response.forEach((item: any, index: number) => {
          audio_message += ` ..press ${index + 1} for  ${item?.firstName} ${
            item?.lastName
          }  `;
          obj[index + 1] = item.id;
        });
        res.status(200).json({
          message: "Success",
          data: {
            clientId: obj,
            client_count: response.length,
            audio_message: audio_message,
          },
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  });

  app.post("/get_client_services", async (req: Request, res: Response) => {
    const { from_number, emp_id, client_id } = req.body;

    try {
      const response = await IvrServices.Get_client_services(
        from_number as any,
        emp_id as any,
        client_id as any
      );

      if (response) {
        const obj: any = {};
        let forValue = `for `;
        let audio_message = `There are ${response?.length} service ..${
          response[0]?.org_clients_firstName
            ? forValue + response[0]?.org_clients_firstName
            : ""
        } ${
          response[0]?.org_clients_lastName
            ? response[0]?.org_clients_lastName
            : ""
        } `;

        response.forEach((item: any, index: number) => {
          audio_message += `..Press ${index + 1} for ${
            item?.services_serviceName
          },`;
          obj[index + 1] = item?.assignedServices_id;
        });
        res.status(200).json({
          message: "Success",
          service_id: obj,
          passcode: {
            service_count: response.length,
            audio_message: audio_message,
          },
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/confirm_service_visit", async (req: Request, res: Response) => {
    const { service_id } = req.body;
    try {
      const response = await IvrServices.Confirm_service_visit(
        service_id as any
      );

      if (response) {
        const obj: any = {};
        let audio_message = ` You are starting a visit for ${
          response?.results?.org_clients_firstName
        } ..at.. ${new Date().toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })} for ${response?.results?.services_serviceName} and there are `;
        response?.taskData?.forEach((item: any) => {
          audio_message += ` ${item?.taskId.length} tasks ,please perform tasks `;
          item?.taskNames?.map((value: any, index: any) => {
            audio_message += ` ${value?.taskName}, .`;
            obj[index + 1] = value?.taskId;
          });
          audio_message +=
            "  please call back to end this visit, ..thank you.., ..goodbye.";
        });
        res.status(200).json({
          message: "Success",
          audio_message: audio_message,
          task_id: obj,
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  // 2nd step flow
  app.post(
    "/validate_passcode_step_two",
    async (req: Request, res: Response) => {
      const { from_number, pass_code, service_id, client_id } = req.body;
      try {
        const response = await IvrServices.Validate_passcode_step_two(
          from_number as any,
          service_id as any,
          client_id as any
        );
        if (response?.result?.org_employees_passcode == pass_code) {
          let msg = `Please confirm that ${response?.result?.services_serviceName} has been completed. Press 1 if the service is completed. Press 3 if this service is not complete.`;

          res.status(200).json({
            message: "Success",
            visit_id: response?.findVisit?.id,
            passcode: {
              audio_message: msg,
              service_id: response?.result?.assignedServices_id,
              employee_id: response?.result?.org_employees_id,
            },
          });
        } else {
          res.status(200).json({
            message: "Error",
            passcode: {
              value: "Invalid passcode",
              audio_message: "",
            },
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  );
  app.post("/update_service_status", async (req: Request, res: Response) => {
    try {
      const { service_id } = req.body;

      const response = await IvrServices.Update_service_status(
        service_id as any
      );
      if (response && response?.affected) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });
  app.post(
    "/get_client_tas_klist_data",
    async (req: Request, res: Response) => {
      const { service_id, completed_tasks_count, visit_id } = req.body;

      try {
        const myresponse = await IvrServices.Get_client_task_list_data(
          service_id,
          completed_tasks_count,
          visit_id
        );

        if (myresponse) {
          let option: any = myresponse?.taskList[+completed_tasks_count];
          let audio_message = `..Press 1 for task ${option?.taskName},  is completed  and, ..Press 3 task is not completed`;

          res.status(200).send({
            success: true,
            audio_message: audio_message,
            task_id: option.id,
            task_count: myresponse?.lengthOfTaskList,
          });
        } else {
          res.status(200).json({
            message: "Error",
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    }
  );

  app.post("/task_add_in_ivrTask", async (req: Request, res: Response) => {
    try {
      const { service_id, task_id, visit_id, status } = req.body;
      if (status == "1") {
        const myresponse = await IvrServices.Task_add_in_ivrTask(
          service_id,
          task_id,
          visit_id
        );

        if (myresponse && myresponse.affected) {
          res.status(200).json({
            message: "Success",
            affected: myresponse.affected,
          });
        } else {
          res.status(200).json({
            message: "Error",
          });
        }
      } else {
        res.status(200).json({
          message: "Success",
          affected: 0,
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  app.post("/update_comment", async (req: Request, res: Response) => {
    try {
      const { comment, visit_id } = req.body;

      const response = await IvrServices.Update_comment(
        comment as any,
        visit_id as any
      );

      if (response?.affected) {
        res.status(200).json({
          message: "Success",
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });

  app.post("/validate_approver", async (req: Request, res: Response) => {
    const { employee_id } = req.body;
    try {
      const response = await IvrServices.Validate_approver(employee_id as any);
      if (response) {
        let dualRole;
        let isEmployee;
        let isResponsibleParty;
        if (
          response.isEmployee == "true" &&
          response.isResponsibleParty == "true"
        ) {
          dualRole = 1;
        }
        if (
          response.isEmployee == "true" &&
          response.isResponsibleParty == "false"
        ) {
          dualRole = 2;
        }
        if (
          response.isEmployee == "false" &&
          response.isResponsibleParty == "true"
        ) {
          dualRole = 3;
        }
        res.status(200).json({
          message: "Success",
          is_approver: 1,
          dualRole: dualRole,
          isEmployee: isEmployee,
          isResponsibleParty: isResponsibleParty,
        });
      } else {
        res.status(200).json({
          message: "Error",
          is_approver: 0,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });

  app.post("/get_worked_hours", async (req: Request, res: Response) => {
    const { visit_id } = req.body;
    const response = await IvrServices.Get_worked_hours(visit_id as any);

    res.status(200).json({
      message: "Success",
      audio_message: `Your visit has been ended. You worked ${response}. Thank you and good bye!`,
    });
  });

  // approve flow
  app.post("/validate_approve_visit", async (req: Request, res: Response) => {
    const { from_number, pass_code, service_id } = req.body;

    try {
      const response = await IvrServices.Validate_passcode_step_three(
        from_number as any,
        service_id as any
      );

      if (response?.org_employees_passcode == pass_code) {
        res.status(200).json({
          message: "Success",
          passcode: {
            service_id: response?.assignedServices_id,
            client_id: response?.assignedServices_clientId,
          },
        });
      } else {
        res.status(200).json({
          message: "Error",
          passcode: {
            value: "Invalid passcode",
          },
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });

  app.post("/list_for_approve", async (req: Request, res: Response) => {
    const { service_id } = req.body;
    try {
      const response = await IvrServices.List_for_approver(service_id as any);

      if (response.visit?.length) {
        let msg = response.visit?.length
          ? `There are ${response?.visit?.length} unapproved visits for ${response?.clientName}. Press 1 to approve each visit one by one, or press 3 to approve all visits .`
          : `There are ${response?.visit?.length} unapproved visits`;
        res.status(200).json({
          message: "Success",
          audio_message: msg,
          num_visit: response,
          num_visits: response?.visit?.length,
          total_visits: response?.visit?.length,
        });
      } else {
        res.status(200).json({
          message: "Error",
          audio_message: "No record found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });

  app.post("/approve_all_visits", async (req: Request, res: Response) => {
    const { client_id, service_id } = req.body;
    try {
      const response = await IvrServices.Approve_all_visits(
        client_id as any,
        service_id as any
      );
      if (response?.affected) {
        let msg = `You have approved total visits`;
        res.status(200).json({
          message: "Success",
          audio_message: msg,
        });
      } else {
        res.status(200).json({
          message: "Error",
          audio_message: "No record found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });

  app.post("/get_visits", async (req: Request, res: Response) => {
    try {
      const { service_id } = req.body;

      const response = await IvrServices.List_for_approver(service_id as any);

      if (response && response?.visit?.length > 0) {
        let audio_message = `There are ${response?.visit?.length} visit for the client for Today to Approved`;

        audio_message += `Press 1 for approved today's visit`;

        res.status(200).json({
          message: "Success",
          service_id: service_id.trim(),
          audio_message: audio_message,
        });
      } else {
        res.status(200).json({
          message: "Error",
          audio_message: "No record found",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        audio_message: "Internal server error",
      });
    }
  });
  // get all the inprogess services list and select one,
  app.post("/inprogess_services", async (req: Request, res: Response) => {
    const { client_id } = req.body;
    try {
      const response = await IvrServices.Inprogess_services(client_id as any);
      if (response && response.length) {
        const obj: any = {};
        const myObj: any = {};
        let audio_message = `There are ${response?.length} services whose visits needs to be approved `;
        response?.forEach((item: any, index: number) => {
          audio_message += `Press ${index + 1} to select ${
            item?.services_serviceName
          },`;
          obj[index + 1] = item?.assignedServices_id;
          myObj[index + 1] = item?.services_serviceName;
        });
        res.status(200).json({
          message: "Success",
          service_id: obj,
          service_name: myObj,
          service_count: response?.length,
          audio_message: audio_message,
          num_services: response?.length,
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        audio_message: "Internal server error",
      });
    }
  });

  // get all list of visit of any specific service id
  app.post("/completed_all_visit_list", async (req: Request, res: Response) => {
    try {
      const { service_id } = req.body;
      const response = await IvrServices.Completed_all_visit_list(
        service_id as any
      );

      if (response && response?.findVisitData?.length) {
        completeAllVisit(response, res);
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const completeAllVisit = async (response: any, res: Response) => {
    const obj: any = {};
    let count = "0";
    let audio_message = ``;

    const item: any = response?.findVisitData?.[+count];

    const endVisitDate = item?.endVisit ? new Date(item.endVisit) : null;
    const startVisitDate = item?.startVisit ? new Date(item.startVisit) : null;

    const taskName = item?.taskList?.map((val: any) => `..` + val.taskName);
    const startTime = startVisitDate
      ? startVisitDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) // Get the start time without seconds
      : "N/A";
    const dateOfVisit = startVisitDate
      ? startVisitDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) // Format the date to "Aug 30 2023"
      : "N/A";
    const endTime = endVisitDate
      ? endVisitDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }) // Get the end time without seconds
      : "N/A";

    if (response?.findVisitData?.length) {
      audio_message += `Visit 1 for ${response?.findClientName?.firstName} , ..Tasks completed are ${taskName} This visit started on ${dateOfVisit} at ${startTime} and ended at ${endTime}. ..press 1 to approve this visit. ..Press 3 to reject this visit.`;
      obj[+count + 1] = item?.id;
    } else {
      audio_message += `There are zero visits `;
    }

    res.status(200).json({
      message: "Success",
      visit_id: obj[+count + 1],
      task_count: response?.findVisitData?.length - 1,
      audio_message: audio_message,
    });
  };

  app.post("/approve_single_visit", async (req: Request, res: Response) => {
    try {
      const { service_id, visit_id, status } = req.body;
      const response = await IvrServices.Approve_single_visit(
        service_id,
        visit_id as any,
        status
      );
      if (response?.updateVisit) {
        res.status(200).json({
          message: "Success",
          remianing_visits: response.remainingVisit,
        });
      } else {
        res.status(200).json({
          message: "Error",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
      });
    }
  });
};
