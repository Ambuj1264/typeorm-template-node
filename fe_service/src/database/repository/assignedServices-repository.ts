import { In, LessThan } from "typeorm";
import { Agency } from "../entity/agency";
import { AssignedServices } from "../entity/assignedServices";
import { OrgClients } from "../entity/org_clients";
import { OrgEmployees } from "../entity/org_employees";
import { Services } from "../entity/services";
import { TaskRequest } from "../entity/task";

export class AssignedServicesRepository {
  async createAssignedServices(data: any) {
    const query = AssignedServices.createQueryBuilder("AssignedServices");
    return query.insert().into(AssignedServices).values(data).execute();
  }
  async findAssignedServicesById(id: any) {
    return AssignedServices.findOne({
      where: { id: id, isDelated: false },
    });
  }
  async findEmployee(id: any) {
    return OrgEmployees.findOne({
      where: { id: id, isDelated: false },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
  }
  async findClient(id: any) {
    return OrgClients.findOne({
      where: { id: id, isDelated: false },
      select: { firstName: true },
    });
  }
  async findAgency(id: any) {
    return Agency.findOne({
      where: { id: id, isDelated: false },
      select: { AGENCY_NAME: true, id: true },
    });
  }
  async findServices(id: any) {
    return Services.find({
      where: { id: id, isDelated: false },
      select: {
        id: true,
        serviceName: true,
      },
    });
  }
  async findAll(agencyId: any) {
    const existingAssignedServices =
      AssignedServices.createQueryBuilder("assignedServices");
    const data = await existingAssignedServices
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id"
      )
      .leftJoinAndSelect(
        OrgClients,
        "org_clients",
        "assignedServices.clientId ::uuid = org_clients.id"
      )

      .leftJoinAndSelect(
        Services,
        "services",
        "assignedServices.serviceId ::uuid = services.id"
      )
      .where("assignedServices.agencyId = :agencyId", { agencyId: agencyId })
      .andWhere("assignedServices.isDeleted = :isDeleted", {
        isDeleted: false,
      })

      .orderBy("assignedServices.createdOn", "DESC")
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
  }
  async findAllForCompleted(clientId: any) {
    const existingAssignedServices =
      AssignedServices.createQueryBuilder("assignedServices");
    return existingAssignedServices
      .leftJoinAndSelect(
        Services,
        "services",
        "assignedServices.serviceId ::uuid = services.id"
      )
      .leftJoinAndSelect(
        OrgEmployees,
        "org_employees",
        "assignedServices.employeeId ::uuid = org_employees.id "
      )
      .leftJoinAndSelect(
        OrgClients,
        "org_clients",
        "assignedServices.clientId ::uuid = org_clients.id"
      )
      .where("assignedServices.clientId = :clientId", { clientId: clientId })
      .andWhere("assignedServices.isDeleted = :isDeleted", {
        isDeleted: false,
      })
      .andWhere("assignedServices.serviceStatus = :serviceStatus", {
        serviceStatus: "completed",
      })

      .orderBy("assignedServices.createdOn", "DESC")
      .getRawMany();
  }

  async findTask(data: any) {
    if (!data) {
      return false;
    }
    let ids: any[] = [];

    data.forEach((e: any) => {
      ids.push(e.task);
    });

    return TaskRequest.find({
      where: {
        id: In(ids),
        isDelated: false,
      },
      select: {
        id: true,
        taskStatus: true,
        taskCategory: true,
        taskType: true,
      },
    });
  }

  async deleteAssignedServicesById(refrencId: any) {
    const deleteAssignedServices = await AssignedServices.findOne({
      where: { refrencId: refrencId.refrencId, isDelated: false },
    });
    if (!deleteAssignedServices) {
      return false;
    }
    // delete the assignedServices
    deleteAssignedServices.isDelated = true;
    const saveData = await AssignedServices.save(deleteAssignedServices);
    console.log(saveData);

    return true;
  }

  async updateAssignedServices(data: any, refrencId: any) {
    const updateAssignedServices = await AssignedServices.find({
      where: { refrencId, isDelated: false },
    });

    if (!updateAssignedServices) {
      return false;
    }
    // delete the assignedServices
    for (let value of updateAssignedServices) {
      value.isDelated = true;
      await AssignedServices.save(value);
    }

    //  insert data
    return this.createAssignedServices(data);
  }
  async filterAssginedServices(search: any) {
    const filterData = AssignedServices.createQueryBuilder("assignedServices");
    return filterData
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
      .innerJoinAndSelect(
        Services,
        "services",
        "assignedServices.serviceId ::uuid = services.id"
      )
      .where("assignedServices.agencyId = :agencyId", {
        agencyId: search.agencyId,
      })
      .andWhere("assignedServices.isDeleted = :isDeleted", {
        isDeleted: false,
      })
      .andWhere(
        "((assignedServices.refrencId ILIKE :refrencId) OR (org_employees.firstName ILIKE :firstName OR org_employees.lastName ILIKE :lastName) OR (org_clients.firstName ILIKE :firstName OR org_clients.lastName ILIKE :lastName)) AND org_employees.agencyId = :agencyId AND org_employees.isDeleted = :isDeleted",
        {
          firstName: `%${search.search}%`,
          lastName: `%${search.search}%`,
          agencyId: search.agencyId,
          isDeleted: false,
          refrencId: `%${search.search}%`,
        }
      )
      .orderBy("assignedServices.createdOn", "DESC")
      .getRawMany();
  }
  filterVisits = async (searchObj: any) => {
    console.log(searchObj, "search");

    const filterData = AssignedServices.createQueryBuilder("assignedServices");
    return filterData
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
      .innerJoinAndSelect(
        Services,
        "services",
        "assignedServices.serviceId ::uuid = services.id"
      )
      .where("assignedServices.agencyId = :agencyId", {
        agencyId: searchObj.agencyId,
      })
      .andWhere("assignedServices.isDeleted = :isDeleted", {
        isDeleted: false,
      })
      .andWhere(
        "DATE(assignedServices.startService) <= :startService AND DATE(assignedServices.endService) >= :endService",
        {
          startService: searchObj.startService,
          endService: searchObj.endService,
        }
      )
      .orderBy("assignedServices.createdOn", "DESC")
      .getRawMany();
  };
  changesAssignedStatus = async (serviceStatusObj: any) => {
    const findAssginedServices = await AssignedServices.findOne({
      where: {
        id: serviceStatusObj.id,
        servicesStatus: "inProgress",
      },
    });

    if (
      findAssginedServices &&
      new Date(findAssginedServices.endService) <= new Date()
    ) {
      return AssignedServices.update(
        {
          id: serviceStatusObj.id,
        },
        {
          servicesStatus: serviceStatusObj.serviceStatus,
          isApproved: true,
        }
      );
    } else {
      return {
        affected: 0,
      };
    }
  };
  onLoadingUpdateStatus = async (agencyId: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return AssignedServices.update(
      {
        agencyId: agencyId,
        endService: LessThan(today),
        servicesStatus: "inProgress",
      },

      {
        servicesStatus: "completed",
      }
    );

  };
}
