import { AssignedServicesRepository } from "../database/repository/assignedServices-repository";

import {
  AssigendServicesInputArray,
  IdInputForAssignedServices,
} from "../input-type/assignedServices";
import { errorResData } from "../utils";
import { message } from "../utils/message";
export class AssignedServices {
  public repository: AssignedServicesRepository;

  constructor() {
    this.repository = new AssignedServicesRepository();
  }
  async createAssignedSevices(
    assignedServicesInput: AssigendServicesInputArray
  ) {
    try {
      const existingAssignedServices =
        await this.repository.createAssignedServices(assignedServicesInput);
      return { success: true, data: existingAssignedServices };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotCreated, error.message);
    }
  }
  async getAssignedServices(assignedServicesInput: IdInputForAssignedServices) {
    try {
      const { id } = assignedServicesInput;
      const findAssignedSerivces =
        await this.repository.findAssignedServicesById(id);
      if (!findAssignedSerivces) {
        return errorResData(false, message.dataNotFound, []);
      }
      const findEmployee = await this.repository.findEmployee(
        findAssignedSerivces.employeeId
      );
      const findClient = await this.repository.findClient(
        findAssignedSerivces.clientId
      );
      const findAgency = await this.repository.findAgency(
        findAssignedSerivces.agencyId
      );
      const findServices = await this.repository.findServices(
        findAssignedSerivces.serviceId
      );
      const data = {
        id: findAssignedSerivces.id,
        Employee: findEmployee,
        Client: findClient,
        Services: findServices,
        Task: findAssignedSerivces.taskId,
        Agency: findAgency,
      };
      return { success: true, data: data };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllAssignedServices(agencyId: any) {
    try {
      const findallAssignedServices: any = await this.repository.findAll(
        agencyId
      );
      if (!findallAssignedServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        data: this.separateObjectsByReference(findallAssignedServices),
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllAssignedServicesForServiceStatus(clientId: any) {
    try {
      const findallAssignedServices: any =
        await this.repository.findAllForCompleted(clientId);
      if (!findallAssignedServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        data: this.separateObjectsByReference(findallAssignedServices),
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteAssignedServices(refrencId: string) {
    try {
      const deleteAssignedServices: any =
        await this.repository.deleteAssignedServicesById(refrencId);
      if (!deleteAssignedServices) {
        return errorResData(false, message.dataIsNotDeleted, []);
      }
      return { success: true, data: "data deleted successfully" };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
  async filterAssginedServices(search: any) {
    try {
      const findAssginedServices = await this.repository.filterAssginedServices(
        search
      );
      if (!findAssginedServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        data: this.separateObjectsByReference(findAssginedServices),
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error);
    }
  }
  async updateAssignedServices(
    assignedServicesInput: AssigendServicesInputArray,
    refrencId: any
  ) {
    try {
      const updateAssignedServices =
        await this.repository.updateAssignedServices(
          assignedServicesInput,
          refrencId
        );
      if (updateAssignedServices === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateAssignedServices };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
  separateObjectsByReference = (arr: any) => {
    const groupedObjects: any = {};

    arr.forEach((obj: any) => {
      const reference = obj.assignedServices_refrencId;
      if (groupedObjects.hasOwnProperty(reference)) {
        groupedObjects[reference].push(obj);
      } else {
        groupedObjects[reference] = [obj];
      }
    });

    return Object.values(groupedObjects);
  };
  filterVisits = async (searchObj: any) => {
    try {
      const findAssginedServices = await this.repository.filterVisits(
        searchObj
      );
      if (!findAssginedServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        data: this.separateObjectsByReference(findAssginedServices),
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  changeStatusForAssignedService = async (serviceStatusObj: any) => {
    try {
      const chnagesStatus = await this.repository.changesAssignedStatus(
        serviceStatusObj
      );
      if (chnagesStatus.affected) {
        return { success: true, data: chnagesStatus };
      } else {
        return errorResData(false, message.dataNotFound, []);
      }
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  onLoadingUpdate = async (agencyId: any) => {
    try {
      const updateAssigned = await this.repository.onLoadingUpdateStatus(
        agencyId
      );
      if (updateAssigned) {
        return { success: true, data: updateAssigned };
      } else {
        return errorResData(false, message.dataNotFound, []);
      }
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
}
