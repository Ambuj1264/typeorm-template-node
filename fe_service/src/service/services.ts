import { ServicesRepository } from "../database/repository/services";
import { errorResData } from "../utils";
import { ServiceInput, IdforServiceInput } from "../input-type/services";
import { message } from "../utils/message";
export class Services {
  public repository: ServicesRepository;
  constructor() {
    this.repository = new ServicesRepository();
  }
  async createService(serviceInputs: ServiceInput) {
    try {
      const createService = await this.repository.createServices(serviceInputs);
      return { success: true, data: createService };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotCreated, error.message);
    }
  }
  async getService(serviceInput: IdforServiceInput) {
    try {
      const { id } = serviceInput;
      const findServices = await this.repository.findServicesById(id);
      if (!findServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findServices };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllServices(targetId: string) {
    try {
      const findServices = await this.repository.findServicesAll(targetId);
      if (!findServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findServices };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async filterServices(search: any) {
    try {
      const findServices = await this.repository.filterSerVice(search);
      if (!findServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findServices };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteServices(serviceInput: IdforServiceInput) {
    try {
      const { id } = serviceInput;
      const deleteServices = await this.repository.deleteServicesById(id);
      if (!deleteServices) {
        return errorResData(false, message.dataIsNotDeleted, []);
      }
      return { success: true, data: deleteServices };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
  async updateServices(serviceInputs: ServiceInput, id: IdforServiceInput) {
    try {
      const updateServices = await this.repository.updateServices(
        serviceInputs,
        id
      );
      if (updateServices === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateServices };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
}
