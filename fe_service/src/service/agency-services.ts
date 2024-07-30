import { AgencyRepository } from "../database/repository/agency-repository";
import { userService } from "../service";

import {
  CreateAgencyInput,
  GetAgencyInput,
  DeleteAgencyInput,
  UpdateAgencyInput,
  IdforUpdatedAgencyInput,
} from "../input-type/agency";
import { errorResData } from "../utils";
import { message } from "../utils/message";
export class AgencyService {
  public repository: AgencyRepository;

  constructor() {
    this.repository = new AgencyRepository();
  }
  async createAgency(agencyInput: CreateAgencyInput) {
    try {
      const { EMAIL_ID, PASSWORD } = agencyInput;

      const checkAgencyExist = await this.repository.findAgency(EMAIL_ID);
      if (checkAgencyExist) {
        return errorResData(false, message.dataIsNotCreated, []);
      } else {
        const existingAgency = await this.repository.createAgency(agencyInput);
        if (existingAgency?.id) {
          let userData = {
            email: EMAIL_ID,
            password: PASSWORD || "123456",
            roleId: "2",
            targetId: existingAgency && existingAgency.id,
          };
          const response: any = await userService.signUp(userData);

          return {
            success: true,
            data: existingAgency,
            loginDetails: response,
          };
        }
      }
    } catch (error: any) {
      return errorResData(false, message.agencyIsNotCreated, error.message);
    }
  }
  async getAgency(agencyInput: GetAgencyInput) {
    try {
      const { id } = agencyInput;

      const findAgency = await this.repository.findAgencyById(id);
      if (!findAgency) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findAgency };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getEmployeeByAgency(agencyInput: GetAgencyInput) {
    try {
      const { id } = agencyInput;

      const findAgency = await this.repository.findEmployeesByAgencyId(id);
      if (!findAgency) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findAgency };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllAgency() {
    try {
      const findallAgency = await this.repository.findAll();
      if (!findallAgency) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findallAgency };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async fileterAgency(search: string) {
    try {
      const findAgency = await this.repository.fileterAgency(search);
      if (!findAgency) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findAgency };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteAgency(agencyInput: DeleteAgencyInput) {
    try {
      const { id } = agencyInput;
      const deleteAgency: any = await this.repository.deleteAgencyById(id);
      if (!deleteAgency) {
        return errorResData(false, message.dataIsNotDeleted, []);
      }
      return { success: true, data: deleteAgency };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
  async updateAgency(
    agencyInput: UpdateAgencyInput,
    id: IdforUpdatedAgencyInput
  ) {
    try {
      const updateAgency = await this.repository.updateAgency(agencyInput, id);
      if (updateAgency === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateAgency };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
}
