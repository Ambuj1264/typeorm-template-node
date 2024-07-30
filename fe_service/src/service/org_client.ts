import { ClientRepository } from "../database/repository/org_client";
import { errorResData, resWarningData } from "../utils";
import { ClientInput, IdforClientInput } from "../input-type/client";
import { message } from "../utils/message";
export class Clientservice {
  public repository: ClientRepository;
  constructor() {
    this.repository = new ClientRepository();
  }
  async createClient(clientInputs: ClientInput) {
    try {
      const { emailId } = clientInputs;
      const isExistingClient = await this.repository.findClient({
        emailId,
      });
      if (isExistingClient) {
        return resWarningData(message.clientIsAlreadyExist);
      }
      const existingEmployee = await this.repository.createClient(clientInputs);
      return { success: true, data: existingEmployee };
    } catch (error: any) {
      return errorResData(false, message.clientIsNotCreated, error.message);
    }
  }
  checkPasscode = async (passcode: any, agencyId: any) => {
    try {
      const myPassCode = await this.repository.checkPass(passcode, agencyId);
      if (!myPassCode) {
        return errorResData(false, message.employeeIsNotDeleted, []);
      }
      return {
        success: true,
        message: "passcode is matched",
        data: myPassCode.passcode,
      };
    } catch (error: any) {
      return errorResData(false, message.employeeIsNotDeleted, error.message);
    }
  };
  async getClient(ClientInputs: IdforClientInput) {
    try {
      const { id } = ClientInputs;
      const findEmployee = await this.repository.findClientById(id);
      if (!findEmployee) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findEmployee };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async fileterClient(search: any) {
    try {
      const findClient = await this.repository.fileterClients(search);
      if (!findClient) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findClient };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllClient(agencyId: any) {
    try {
      const findEmployee = await this.repository.findAll(agencyId);
      if (!findEmployee) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findEmployee };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteClient(ClientInputs: IdforClientInput) {
    try {
      const { id } = ClientInputs;
      const deleteEmployee = await this.repository.deleteClientById(id);
      if (!deleteEmployee) {
        return errorResData(false, message.clientIsNotDeleted, []);
      }

      return { success: true, data: deleteEmployee };
    } catch (error: any) {
      return errorResData(false, message.clientIsNotDeleted, error.message);
    }
  }
  async updateClient(ClientInputs: ClientInput, id: IdforClientInput) {
    try {
      const updateClient = await this.repository.updateCleint(ClientInputs, id);
      if (updateClient === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }

      return { success: true, data: updateClient };
    } catch (error: any) {
      return errorResData(false, message.clientIsNotUpdated, error.message);
    }
  }
  checkClientNumber = async (ClientNumber: string, agencyId: any) => {
    try {
      const myPassCode = await this.repository.checkClientNumberIsExist(
        ClientNumber,
        agencyId
      );
      if (!myPassCode) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        message: "ClientNumber is matched",
        data: myPassCode.passcode,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  ivrLanguage = async () => {
    try {
      const language = await this.repository.listOfLanguage();
      if (!language) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        message: "languages find",
        data: language,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
}
