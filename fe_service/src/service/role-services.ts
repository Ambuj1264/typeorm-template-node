import { RoleRepository } from "../database/repository/role-repository";
import { errorResData, resWarningData } from "../utils";
import { RoleInput } from "../input-type/role";
import { message } from "../utils/message";
export class RoleServices {
  public repository: RoleRepository;

  constructor() {
    this.repository = new RoleRepository();
  }
  async createRole(roleInputs: RoleInput) {
    try {
      const { ROLE_ID } = roleInputs;
      const isExistingAgency = await this.repository.findRole({ ROLE_ID });
      if (isExistingAgency) {
        return resWarningData(message.agencyIsAlreadyExist);
      }
      const existingAgency = await this.repository.createRole(roleInputs);
      return { success: true, data: existingAgency };
    } catch (error: any) {
      return errorResData(false, message.somethingWentWrong, error.message);
    }
  }
}
