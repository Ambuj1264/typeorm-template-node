import { Between, In, IsNull, Not } from "typeorm";
import { AssignedServices } from "../../database/entity/assignedServices";
import { OrgClients } from "../../database/entity/org_clients";
import { Visits } from "../../database/entity/visit";
import { OrgEmployees } from "../../database/entity/org_employees";
import { Services } from "../../database/entity/services";
import { TaskRequest } from "../../database/entity/task";

export class IvrServices {
  public static Validate_caller_id = async (from_number: any) => {
    try {
      return OrgClients.findOne({
        where: { phoneNumber: from_number },
      });
    } catch (error) {
      return false;
    }
  };
  public static async Is_active_visit(
    client_id: any,
    status: any,
    from_number: string
  ) {
    try {
      const findClients = await OrgClients.find({
        where: {
          // id: client_id,
          phoneNumber: from_number,
          isDelated: false,
        },
      });

      if (!findClients.length) {
        return false;
      }
      const clientIds = findClients.map((value) => value?.id);
      const findAllAssigned = await AssignedServices.find({
        where: {
          clientId: In(clientIds),
          isDelated: false,
          isApproved: false,
          servicesStatus: status,
        },
      });
      const filteredVisits = await this.findActiveVisits(findAllAssigned);
      return filteredVisits.length > 0 ? filteredVisits : false;
    } catch (error) {
      return false;
    }
  }

  public static async findActiveVisits(findAllAssigned: any) {
    if (findAllAssigned.length === 0) {
      return [];
    }
    const assignedIds = findAllAssigned.map((item: any) => item.id);
    const findVisit = await Visits.find({
      where: {
        endVisit: IsNull(),
        assignedServiceId: In(assignedIds),
        isDeleted: false,
      },
    });

    const today = new Date().toLocaleDateString();

    return findVisit.filter(
      (visit: any) =>
        visit.startVisit?.toLocaleDateString() === today &&
        visit.endVisit === null
    );
  }

  public static Validate_passcode = async (
    from_number: any,
    pass_code: any,
    client_id: any
  ) => {
    try {
      const existingClient = await OrgClients.findOne({
        where: { phoneNumber: from_number },
      });
      if (!existingClient) {
        return false;
      }
      const assignedService = await AssignedServices.find({
        where: {
          clientId: existingClient?.id,
          isDelated: false,
          agencyId: existingClient?.agencyId,
        },
      });
      if (!assignedService) {
        return false;
      }
      let employees = [];

      for (let i in assignedService) {
        employees.push(assignedService[i].employeeId);
      }

      const assignedEmployee = await OrgEmployees.findOne({
        where: {
          id: In(employees),
          passcode: pass_code,
          isDelated: false,
          agencyId: existingClient?.agencyId,
        },
      });
      if (!assignedEmployee) {
        return false;
      }
      return assignedEmployee;
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  public static Is_a_visit_approver = async (emp_id: any) => {
    try {
      const assignService =
        AssignedServices.createQueryBuilder("assignedServices");
      const results = await assignService
        .where("assignedServices.employeeId = :employeeId", {
          employeeId: emp_id,
        })
        .andWhere("assignedServices.isApproved = :isApproved", {
          isApproved: false,
        })
        .andWhere("assignedServices.serviceStatus = :serviceStatus", {
          serviceStatus: "inProgress",
        });

      return results.getRawMany();
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };
  public static Get_Clients_Names = async (from_number: any) => {
    try {
      return await OrgClients.find({
        where: {
          phoneNumber: from_number,
        },
        select: {
          firstName: true,
          middleName: true,
          lastName: true,
          id: true,
        },
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  public static Get_client_services = async (
    from_number: any,
    emp_id: any,
    client_id: any
  ) => {
    try {
      if (!client_id) {
        const currentDate = new Date();
        currentDate.setHours(5, 30, 0, 0);

        const client = OrgClients.createQueryBuilder("org_clients");
        return client
          .innerJoinAndSelect(
            AssignedServices,
            "assignedServices",
            "assignedServices.clientId ::uuid = org_clients.id"
          )
          .innerJoinAndSelect(
            Services,
            "services",
            "assignedServices.serviceId ::uuid = services.id"
          )
          .innerJoinAndSelect(
            OrgEmployees,
            "org_emplooyees",
            "assignedServices.employeeId ::uuid = org_emplooyees.id"
          )
          .where("org_clients.phoneNumber = :phoneNumber", {
            phoneNumber: from_number,
          })
          .andWhere("org_emplooyees.id = :id", {
            id: emp_id,
          })
          .andWhere("assignedServices.serviceStatus != :serviceStatus", {
            serviceStatus: "completed",
          })
          .andWhere(
            "assignedServices.startService <= :currentDate AND assignedServices.endService >= :currentDate",
            {
              currentDate: currentDate,
            }
          )
          .andWhere("assignedServices.isDelated = :isDelated", {
            isDelated: false,
          })
          .getRawMany();
      } else {
        const currentDate = new Date();
        currentDate.setHours(5, 30, 0, 0);

        const client = OrgClients.createQueryBuilder("org_clients");
        return client
          .innerJoinAndSelect(
            AssignedServices,
            "assignedServices",
            "assignedServices.clientId ::uuid = org_clients.id"
          )
          .innerJoinAndSelect(
            Services,
            "services",
            "assignedServices.serviceId ::uuid = services.id"
          )
          .innerJoinAndSelect(
            OrgEmployees,
            "org_emplooyees",
            "assignedServices.employeeId ::uuid = org_emplooyees.id"
          )
          .where("org_emplooyees.id = :id", {
            id: emp_id,
          })
          .andWhere("org_clients.id = :clientId", {
            // Corrected property name
            clientId: client_id,
          })
          .andWhere("assignedServices.serviceStatus != :serviceStatus", {
            serviceStatus: "completed",
          })
          .andWhere(
            "assignedServices.startService <= :currentDate AND assignedServices.endService >= :currentDate",
            {
              currentDate: currentDate,
            }
          )
          .andWhere("assignedServices.isDelated = :isDelated", {
            isDelated: false,
          })
          .getRawMany();
      }
    } catch (error: any) {
      console.error(error);
      return false;
    }
  };
  public static Get_client_task_list = async (service_id: any) => {
    try {
      const services = await AssignedServices.find({
        where: {
          id: service_id.trim(),
          isDelated: false,
        },
        select: {
          taskId: true,
        },
      });
      for (const service of services) {
        if (service?.taskId && service?.taskId.length > 0) {
          const task: any = service.taskId;

          const taskIds = task.map((taskItem: any) => taskItem?.taskId);
          const tasks: any = await TaskRequest.find({
            where: {
              id: In(taskIds),
              isDelated: false,
            },
          });
          service.taskId = tasks;
        } else {
          service.taskId = "";
        }
      }

      if (!services) {
        return false;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastTime = new Date();
      lastTime.setHours(23, 59, 59, 0);
      const visitData = await Visits.find({
        where: {
          isApproved: false,
          isDeleted: false,
          assignedServiceId: service_id.trim(),
          startVisit: Between(today, lastTime),
          endVisit: Not(IsNull()),
        },
        select: {
          taskList: true,
        },
      });

      return services.filter((service: any) => {
        return !service.taskId.some((serviceTask: any) => {
          return visitData.some(
            (visit: any) => visit.taskId === serviceTask.id
          );
        });
      });
    } catch (error: any) {
      console.error(error);
    }
  };

  public static Confirm_service_visit = async (service_id: any) => {
    try {
      const startVisit = new Date();

      // Update AssignedServices status to "inProgress"
      await AssignedServices.update(
        { id: service_id.trim(), isDelated: false },
        { servicesStatus: "inProgress" }
      );

      // Fetch AssignedServices details
      const findAssigned = await AssignedServices.find({
        where: {
          id: service_id.trim(),
          isDelated: false,
        },
        select: {
          agencyId: true,
          taskId: true,
        },
      });

      if (!findAssigned || findAssigned.length === 0) {
        return false;
      }

      // Create Visit and save it
      const startVisited = await this.createAndSaveVisit(
        service_id,
        startVisit,
        findAssigned
      );

      // Fetch additional data for results
      const results = await this.fetchResults(service_id);

      // Filter taskData with task names
      const taskData = await this.filterTaskData(findAssigned, startVisited);

      return {
        results: results,
        taskData,
      };
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  // Helper function to create and save a visit
  public static async createAndSaveVisit(
    service_id: any,
    startVisit: Date,
    findAssigned: any
  ) {
    const myValue: any = findAssigned[0].taskId.map((value: any) => ({
      ...value,
      isCompleted: false,
    }));

    const startVisited = await Visits.create({
      assignedServiceId: service_id.trim(),
      startVisit: startVisit,
      agencyId: findAssigned[0]?.agencyId,
      taskList: myValue,
    });

    await Visits.save(startVisited);
    return startVisited;
  }

  // Helper function to fetch additional data for results
  public static async fetchResults(service_id: any) {
    const assignService =
      AssignedServices.createQueryBuilder("assignedServices");
    return assignService
      .innerJoinAndSelect(
        Services,
        "services",
        "assignedServices.serviceId ::uuid = services.id"
      )
      .innerJoinAndSelect(
        OrgClients,
        "org_clients",
        "assignedServices.clientId ::uuid = org_clients.id"
      )
      .where("assignedServices.id = :id", {
        id: service_id.trim(),
      })
      .andWhere("assignedServices.isDelated = :isDelated", {
        isDelated: false,
      })
      .getRawOne();
  }

  public static async filterTaskData(findAssigned: any, startVisited: any) {
    // Helper function to filter taskData with task names
    return Promise.all(
      findAssigned.map(async (service: any) => {
        const taskNames = await this.getTaskNames(service.taskId);
        return {
          ...service,
          taskNames,
        };
      })
    );
  }

  // Helper function to get task names by task IDs
  public static async getTaskNames(taskIds: any) {
    if (!taskIds || taskIds.length === 0) {
      return [];
    }

    const taskNames = await TaskRequest.find({
      where: {
        id: In(taskIds.map((taskItem: any) => taskItem?.taskId)),
        isDelated: false,
      },
      select: {
        id: true,
        taskName: true, // Replace with the actual name of the task property
      },
    });

    return taskNames.map((task: any) => ({
      taskId: task.id,
      taskName: task.taskName,
    }));
  }
  public static Validate_passcode_step_three = async (
    client_id: any,

    service_id: any
  ) => {
    try {
      const status = "inProgress";

      const findAgencyId = await OrgClients.findOne({
        where: {
          id: client_id,
          isDelated: false,
        },
      });
      if (findAgencyId?.agencyId) {
        const assignService =
          AssignedServices.createQueryBuilder("assignedServices");
        const results = await assignService
          .innerJoinAndSelect(
            Services,
            "services",
            "assignedServices.serviceId ::uuid = services.id"
          )
          .innerJoinAndSelect(
            OrgClients,
            "org_clients",
            "assignedServices.clientId ::uuid = org_clients.id"
          )
          .innerJoinAndSelect(
            OrgEmployees,
            "org_employees",
            "assignedServices.employeeId ::uuid = org_employees.id"
          )
          .where("org_clients.id = :id", {
            id: client_id,
          })
          .andWhere("assignedServices.serviceStatus = :serviceStatus", {
            serviceStatus: status,
          })
          .andWhere("assignedServices.agencyId = :agencyId", {
            agencyId: findAgencyId?.agencyId,
          })
          .andWhere("assignedServices.id = :id", {
            id: service_id.trim(),
          })
          .andWhere("(assignedServices.isDelated = :isDelated )", {
            isDelated: false,
          });

        return results.getRawOne();
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };
  public static Validate_passcode_step_two = async (
    from_number: any,
    service_id: any,
    client_id: any
  ) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastTime = new Date();
      lastTime.setHours(23, 59, 59, 0);
      const findVisit = await Visits.findOne({
        where: {
          isApproved: false,
          isDeleted: false,
          assignedServiceId: service_id.trim(),
          startVisit: Between(today, lastTime),
          endVisit: IsNull(),
        },
        select: {
          id: true,
        },
      });
      const findAgencyId = await OrgClients.findOne({
        where: {
          id: client_id,
          isDelated: false,
        },
      });

      if (findAgencyId?.agencyId) {
        const assignService =
          AssignedServices.createQueryBuilder("assignedServices");
        const results = await assignService
          .innerJoinAndSelect(
            Services,
            "services",
            "assignedServices.serviceId ::uuid = services.id"
          )
          .innerJoinAndSelect(
            OrgClients,
            "org_clients",
            "assignedServices.clientId ::uuid = org_clients.id"
          )
          .innerJoinAndSelect(
            OrgEmployees,
            "org_employees",
            "assignedServices.employeeId ::uuid = org_employees.id"
          )
          .where("org_clients.id = :clientId", {
            clientId: client_id,
          })
          .andWhere("assignedServices.serviceStatus = :serviceStatus", {
            serviceStatus: "inProgress",
          })
          .andWhere("assignedServices.agencyId = :agencyId", {
            agencyId: findAgencyId?.agencyId,
          })
          .andWhere("assignedServices.id = :id", {
            id: service_id.trim(),
          })
          .getRawOne();
        return { result: results, findVisit };
      }
    } catch (error) {
      console.error(error);
    }
  };

  public static Get_client_task_list_data = async (
    service_id: any,
    count: any,
    visit_id: any
  ) => {
    try {
      const taskList = await AssignedServices.find({
        where: {
          id: service_id.trim(),
          isDelated: false,
          isApproved: false,
        },
        select: {
          taskId: true,
        },
      });

      for (const service of taskList) {
        if (service.taskId && service.taskId.length > 0) {
          const task: any = service.taskId;

          const taskIds = task.map((taskItem: any) => taskItem?.taskId);
          const tasks: any = await TaskRequest.find({
            where: {
              id: In(taskIds),
              isDelated: false,
            },
          });
          service.taskId = tasks;
        } else {
          service.taskId = "";
        }
      }
      const visitTasks: any = await Visits.findOne({
        where: {
          id: visit_id,
        },
        select: {
          taskList: true,
        },
      });

      const taskRemainingToComplete = taskList.map((taskGroup: any) => ({
        taskId: taskGroup.taskId.filter((task: any) => {
          const visitTask = visitTasks.taskList.find(
            (val: any) => val.taskId === task.id
          );
          return visitTask && visitTask.isCompleted === false;
        }),
      }));
      return {
        taskRemainingToComplete,
        lengthOfTaskList: taskList[0]?.taskId?.length,
        taskList: taskList[0]?.taskId,
      };
    } catch (error: any) {
      console.error(error);
    }
  };
  public static Task_add_in_ivrTask = async (
    service_id: any,
    task_id: any,
    visit_id: any
  ) => {
    try {
      const findTask = await AssignedServices.findOne({
        where: {
          id: service_id.trim(),
          isDelated: false,
        },
        select: {
          taskId: true,
        },
      });
      if (!findTask) {
        return false;
      }
      return this.newTaskUpdate(task_id, service_id, visit_id);
    } catch (error) {
      console.error(error);
    }
  };
  public static newTaskUpdate = async (
    task_id: any,
    service_id: any,
    visit_id: any
  ) => {
    const updateTask = {
      taskId: task_id,
      isCompleted: true,
    };
    const findVisitAndTask = await Visits.findOne({
      where: {
        assignedServiceId: service_id.trim(),
      },
      select: {
        taskList: true,
      },
    });

    const taskListforUpdate: any = findVisitAndTask.taskList;

    const indexToUpdate = taskListforUpdate.findIndex(
      (task: any) => task.taskId == updateTask.taskId
    );

    if (indexToUpdate !== -1) {
      taskListforUpdate[indexToUpdate] = updateTask;

      return Visits.update(
        {
          assignedServiceId: service_id.trim(),
          isApproved: false,
          isDeleted: false,
          id: visit_id,
        },
        {
          taskList: taskListforUpdate,
        }
      );
    } else {
      return false;
    }
  };
  public static Update_service_status = async (service_id: any) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastTime = new Date();
      lastTime.setHours(23, 59, 59, 0);
      return Visits.update(
        {
          assignedServiceId: service_id.trim(),
          isDeleted: false,
          isApproved: false,
          endVisit: IsNull(),
          startVisit: Between(today, lastTime),
        },
        {
          endVisit: new Date(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  public static Update_comment = async (comment: any, visit_id: any) => {
    try {
      if (comment) {
        return Visits.update(
          {
            id: visit_id,
          },
          {
            comment: comment,
          }
        );
      } else {
        return Visits.update(
          {
            id: visit_id,
            isDeleted: false,
          },
          {
            comment: "false",
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  public static Validate_approver = async (employee_id: any) => {
    try {
      return OrgEmployees.findOne({
        where: { id: employee_id },
      });
    } catch (error) {
      console.error(error);
    }
  };
  public static List_for_approver = async (service_id: any) => {
    const status = "inProgress";
    try {
      const findAssignedService = await AssignedServices.findOne({
        where: {
          id: service_id.trim(),
          servicesStatus: status,
          isDelated: false,
        },
      });
      if (findAssignedService) {
        const ClientName = await OrgClients.findOne({
          where: {
            id: findAssignedService?.clientId,
          },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastTime = new Date();
        lastTime.setHours(23, 59, 59, 0);
        const findVisitData = await Visits.find({
          where: {
            assignedServiceId: service_id.trim(),
            isDeleted: false,
            // endVisit: Between(today, lastTime),
            isRejected: false,
            isApproved: false,
          },
        });

        return {
          visit: findVisitData,
          clientName: ClientName?.firstName,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };
  public static Approve_all_visits = async (
    client_id: any,
    service_id: any
  ) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastTime = new Date();
      lastTime.setHours(23, 59, 59, 0);
      return Visits.update(
        {
          assignedServiceId: service_id.trim(),
          isDeleted: false,
          isApproved: false,
          endVisit: Not(IsNull()),
          startVisit: Between(today, lastTime),
        },
        {
          isApproved: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };
  public static Inprogess_services = async (client_id: any) => {
    try {
      const client = OrgClients.createQueryBuilder("org_clients");
      const results = await client
        .innerJoinAndSelect(
          AssignedServices,
          "assignedServices",
          "assignedServices.clientId ::uuid = org_clients.id"
        )
        .innerJoinAndSelect(
          Services,
          "services",
          "assignedServices.serviceId ::uuid = services.id"
        )
        .where("org_clients.id = :id", {
          id: client_id,
        })
        .andWhere("assignedServices.serviceStatus = :serviceStatus", {
          serviceStatus: "inProgress",
        })
        .andWhere("assignedServices.isDelated = :isDelated", {
          isDelated: false,
        })
        .getRawMany();

      const getAllAssignedIds = results.map(
        (value: any) => value?.assignedServices_id
      );

      const findMyData = await Visits.find({
        where: {
          assignedServiceId: In(getAllAssignedIds),
          isDeleted: false,
          endVisit: Not(IsNull()),
          isApproved: false,
          // isRejected: true,
        },
      });
      return results.filter((value: any) => {
        return findMyData.some(
          (data: any) => data.assignedServiceId === value?.assignedServices_id
        );
      });
    } catch (error) {
      console.error(error);
    }
  };
  public static Completed_all_visit_list = async (service_id: any) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const lastTime = new Date();
      lastTime.setHours(23, 59, 59, 0);
      const findVisitData = await Visits.find({
        where: {
          assignedServiceId: service_id,
          isApproved: false,
          isDeleted: false,
          startVisit: Between(today, lastTime),
          endVisit: Not(IsNull()),
          isRejected: false,
        },
        select: {
          id: true,
          endVisit: true,
          startVisit: true,
          taskList: true,
        },
      });
      if (findVisitData) {
        for (let service of findVisitData) {
          if (service.taskList && service.taskList.length > 0) {
            const task: any = service.taskList;

            const taskIds = task.map((taskItem: any) => taskItem?.taskId);
            const tasks: any = await TaskRequest.find({
              where: {
                id: In(taskIds),
                isDelated: false,
              },
            });
            service.taskList = tasks;
          } else {
            service.taskList = "";
          }
        }
        const findAssignedServices = await AssignedServices.findOne({
          where: {
            id: service_id,
          },
        });

        const findClientName = await OrgClients.findOne({
          where: {
            id: findAssignedServices?.clientId,
          },
          select: {
            firstName: true,
          },
        });

        return { findVisitData, findClientName };
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };
  public static Approve_single_visit = async (
    service_id: any,
    visit_id: any,
    status: any
  ) => {
    try {
      if (status == "1") {
        const updateVisit = await Visits.update(
          {
            id: visit_id,
            isApproved: false,
            isDeleted: false,
            isRejected: false,
          },
          {
            isApproved: true,
          }
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastTime = new Date();
        lastTime.setHours(23, 59, 59, 0);
        const visitData = await Visits.find({
          where: {
            isApproved: false,
            isDeleted: false,
            isRejected: false,
            assignedServiceId: service_id.trim(),
            startVisit: Between(today, lastTime),
            endVisit: Not(IsNull()),
          },
        });

        return {
          updateVisit,
          remainingVisit: visitData.length,
        };
      } else {
        const updateVisit = await Visits.update(
          {
            id: visit_id,
            isApproved: false,
            isDeleted: false,
          },
          {
            isApproved: false,
            isRejected: true,
          }
        );

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastTime = new Date();
        lastTime.setHours(23, 59, 59, 0);
        const visitData = await Visits.find({
          where: {
            isApproved: false,
            isDeleted: false,
            isRejected: false,
            assignedServiceId: service_id.trim(),
            startVisit: Between(today, lastTime),
            endVisit: Not(IsNull()),
          },
        });

        return {
          updateVisit,
          remainingVisit: visitData.length,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };
  public static Get_worked_hours = async (visit_id: any) => {
    try {
      const getTime = await Visits.findOne({
        where: {
          id: visit_id,
        },
        select: {
          startVisit: true,
          endVisit: true,
        },
      });
      const timestamp1: any = new Date(getTime.startVisit);
      const timestamp2: any = new Date(getTime.endVisit);

      const timeDifferenceInMilliseconds = timestamp2 - timestamp1;

      const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor(
        (timeDifferenceInMilliseconds % (1000 * 60)) / 1000
      );

      return ` ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    } catch (error) {
      console.error(error);
    }
  };
}
