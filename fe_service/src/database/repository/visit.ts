import { Response } from "express";
import { SearchManual, SearchObj } from "../../input-type/visit";
import { AssignedServices } from "../entity/assignedServices";
import { OrgClients } from "../entity/org_clients";
import { OrgEmployees } from "../entity/org_employees";
import { Services } from "../entity/services";
import { Visits } from "../entity/visit";
import { Parser } from "@json2csv/plainjs";
import { In } from "typeorm";
import fs from "fs";
import { TaskRequest } from "../entity/task";

export class VistiRepository {
  manageCreateAssignedServices = async (manageData: any) => {
    const findAssignedSerivces = await AssignedServices.findOne({
      where: {
        id: manageData.assignedServiceId,
      },
      select: {
        agencyId: true,
      },
    });
    if (findAssignedSerivces) {
      manageData.agencyId = findAssignedSerivces.agencyId;
      return Visits.save(manageData);
    } else {
      return null;
    }
  };
  manageGetAssignedVisit = async (data: any) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    return existingAssignedServices
      .leftJoinAndSelect(
        AssignedServices,
        "assignedServices",
        "visits.assignedServiceId ::uuid = assignedServices.id"
      )
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
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id"
      )
      .where("assignedServices.agencyId = :agencyId", {
        agencyId: data.agencyId,
      })
      .andWhere("visits.assignedServiceId = :assignedServiceId", {
        assignedServiceId: data.assignedServiceId,
      })
      .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("visits.createdOn", "DESC")
      .getRawMany();
  };
  filterVisits = async (searchObjData: SearchObj) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    return existingAssignedServices
      .leftJoinAndSelect(
        AssignedServices,
        "assignedServices",
        "visits.assignedServiceId ::uuid = assignedServices.id"
      )
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
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id"
      )
      .where("visits.agencyId = :agencyId", {
        agencyId: searchObjData.agencyId,
      })
      .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere(
        "DATE(visits.startVisit) >= :startVisit AND DATE(visits.endVisit) <= :endVisit",
        {
          startVisit: searchObjData.startVisit,
          endVisit: searchObjData.endVisit,
        }
      )
      .orderBy("visits.createdOn", "DESC")
      .getRawMany();
  };
  filterVisitsForManualSearch = async (searchObjData: SearchManual) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    return existingAssignedServices
      .leftJoinAndSelect(
        AssignedServices,
        "assignedServices",
        "visits.assignedServiceId ::uuid = assignedServices.id"
      )
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
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id"
      )
      .where("visits.agencyId = :agencyId", {
        agencyId: searchObjData.agencyId,
      })
      .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere(
        "(((assignedServices.refrencId ILIKE :refrencId)) OR (org_employees.firstName ILIKE :firstName OR org_employees.lastName ILIKE :lastName) OR (org_clients.firstName ILIKE :firstName OR org_clients.lastName ILIKE :lastName) )",
        {
          firstName: `%${searchObjData.search}%`,
          lastName: `%${searchObjData.search}%`,
          refrencId: `%${searchObjData.search}%`,
          isDeleted: false,
        }
      )
      .orderBy("visits.createdOn", "DESC")
      .getRawMany();
  };
  getFullVisit = async (agencyId: any) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    const data = await existingAssignedServices
      .leftJoinAndSelect(
        AssignedServices,
        "assignedServices",
        "visits.assignedServiceId ::uuid = assignedServices.id"
      )
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
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id"
      )
      .where("visits.agencyId = :agencyId", { agencyId: agencyId })

      .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
      .orderBy("visits.createdOn", "DESC")
      .getRawMany();

    for (const service of data) {
      if (
        service.assignedServices_taskId &&
        service.assignedServices_taskId.length > 0
      ) {
        const task: any = service.assignedServices_taskId;

        const taskIds = task.map((taskItem: any) => taskItem?.taskId);
        const tasks: any = await TaskRequest.find({
          where: {
            id: In(taskIds),
          },
        });

        service.assignedServices_taskId = tasks;
      } else {
        service.task = "";
      }
    }
    return data;
  };
  export = async (data: any, res: Response) => {
    if (data?.visit_Ids?.length) {
      const existingAssignedServices = Visits.createQueryBuilder("visits");
      const row = await existingAssignedServices
        .leftJoinAndSelect(
          AssignedServices,
          "assignedServices",
          "visits.assignedServiceId ::uuid = assignedServices.id"
        )
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
        .leftJoinAndSelect(
          OrgEmployees,
          "org_employees",
          "assignedServices.employeeId ::uuid = org_employees.id"
        )
        .where({ id: In(data.visit_Ids) })
        .andWhere("visits.agencyId = :agencyId", { agencyId: data.agencyId })
        .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
        .andWhere("visits.exported = :exported", { exported: false })
        .orderBy("visits.createdOn", "DESC")
        .getRawMany();

      return this.makeExportObj(row, res, data?.visit_Ids);
    } else {
      const existingAssignedServices = Visits.createQueryBuilder("visits");
      const row = await existingAssignedServices
        .leftJoinAndSelect(
          AssignedServices,
          "assignedServices",
          "visits.assignedServiceId ::uuid = assignedServices.id"
        )
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
        .leftJoinAndSelect(
          OrgEmployees,
          "org_employees",
          "assignedServices.employeeId ::uuid = org_employees.id"
        )
        .where("visits.agencyId = :agencyId", { agencyId: data.agencyId })
        .andWhere("visits.isDeleted = :isDeleted", { isDeleted: false })
        .andWhere("visits.exported = :exported", { exported: false })
        .orderBy("visits.createdOn", "DESC")
        .getRawMany();
      return this.makeExportObj(row, res, []);
    }
  };
  updateApporoved = (ids: any) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    return existingAssignedServices
      .update(Visits)
      .set({ isApproved: true })
      .where({ id: In(ids) })
      .execute();
  };
  updateVisit = async (data: any) => {
    if (data.visit_type == "approve") {
      return Visits.update(
        { id: data.visits_id },
        {
          isApproved: data.visit_value,
        }
      );
    } else if (data.visit_type == "export") {
      return Visits.update(
        { id: data.visits_id },
        {
          exported: data.visit_value,
        }
      );
    } else if (data.visit_type == "reject") {
      return Visits.update(
        { id: data.visits_id },
        {
          isRejected: data?.visit_value,
        }
      );
    } else {
      return false;
    }
  };
  makeExportObj = async (row: any, res: Response, visit_Ids: any) => {
    try {
      let resultant: any = [];
      let taskNameList: any = [];
      await Promise.all(
        row.map(async (list: any, index: any) => {
          list.assignedServices_taskId.map((tasklist: any) =>
            taskNameList.push(tasklist.taskName)
          );

          let totalHours =
            (list?.visits_endVisit.getTime() -
              list?.visits_startVisit.getTime()) /
            (1000 * 60 * 60);

          const taskIds = list?.assignedServices_taskId.map(
            (taskItem: any) => taskItem?.taskId
          );
          const tasks: any = await TaskRequest.find({
            where: {
              id: In(taskIds),
            },
          });
          console.log(taskNameList);

          list.assignedServices_taskId = tasks;

          const activityIds = list.assignedServices_taskId
            .map((item: any) => item.ActivityID)
            .join(", ");

          let makeObj = {
            Operation: "A", //default
            ClientNumber: list.org_clients_ClientNumber,
            EmployeeNumber: list.org_employees_EmployeeNumber,
            DateOfService: list?.visits_startVisit,
            TotalHours: totalHours.toFixed(2),
            ClockIn: list.visits_startVisit,
            ClockOut: list.visits_endVisit,
            ServiceLine: list.services_ServiceLineCode,
            ServiceCategory: list.services_ServiceCategory,
            ServiceCode: list.assignedServices_ServiceCode,
            AllocationRatio: "1:1", // default
            Activities: activityIds,
            Notes: list.visits_comment,
            ClientAttendance: null || "", //default null
            ReasonCode: null || "", //default null
            LocationId: null || "", //default null
            PlaceOfService: null || "", //default null
            SvcContactMethod: null || "", //default null
            ServiceType: null || "", //default null
            PayorName: list.assignedServices_PayorName,
            UpdateReason: null || "", // default null
            TimesheetNumber: index + 1,
            TransportType: null || "", //default null
          };

          resultant.push(makeObj);
        })
      );

      const parser = new Parser();
      const csv = parser.parse(resultant);

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=users.csv");

      await fs.promises.writeFile("src/public/upload/user.csv", csv);

      const findVisit = await Visits.find({
        select: {
          id: true,
        },
      });

      if (!findVisit || findVisit.length === 0) {
        return false;
      }
      await Visits.createQueryBuilder("visits")
        .update(Visits)
        .set({ exported: true })
        .where({ id: In(visit_Ids) })
        .execute();

      res.attachment("src/public/upload/user.csv");
      fs.createReadStream("src/public/upload/user.csv").pipe(res);

      let urlforDownload = "upload/user.csv";
      resultant.push({ csv: urlforDownload });
      return resultant;
    } catch (error) {
      console.error("Error saving CSV file:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  updateAllVisitFalse = (ids: any) => {
    const existingAssignedServices = Visits.createQueryBuilder("visits");
    return existingAssignedServices
      .update(Visits)
      .set({ exported: false })
      .where({ id: In(ids) })
      .execute();
  };
}
