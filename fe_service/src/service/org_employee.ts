import { EmployeesRepository } from "../database/repository/org_employee";
import { errorResData, resWarningData } from "../utils";
import { EmployeesInput, IdforemployeesInput } from "../input-type/employees";
import { message } from "../utils/message";

export class EmployeeService {
  public repository: EmployeesRepository;

  constructor() {
    this.repository = new EmployeesRepository();
  }
  async createEmployee(employeesInput: EmployeesInput) {
    try {
      const { emailId } = employeesInput;
      const isExistingCountry = await this.repository.findEmployee({
        emailId,
      });
      if (isExistingCountry) {
        return resWarningData(message.employeeIsAlreadyExist);
      }
      const existingEmployee = await this.repository.createEmployee(
        employeesInput
      );
      return { success: true, data: existingEmployee };
    } catch (error: any) {
      return errorResData(false, message.employeeIsNotCreated, error.message);
    }
  }
  async getEmployee(employeesInput: IdforemployeesInput) {
    try {
      const { id } = employeesInput;
      const findEmployee = await this.repository.findEmployeeById(id);
      if (!findEmployee) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findEmployee };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async fileterEmployee(search: any) {
    try {
      const findEmployee = await this.repository.fileterEmployees(search);
      if (!findEmployee) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findEmployee };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllEmployee(agencyId: any) {
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
  checkPasscode = async (passcode: any, agencyId: any) => {
    try {
      const myPassCode = await this.repository.checkPass(passcode, agencyId);
      if (!myPassCode) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        message: "passcode is matched",
        data: myPassCode.passcode,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  checkEmail = async (email: any, agencyId: any) => {
    try {
      const myEmail = await this.repository.checkEmailId(email, agencyId);
      if (!myEmail) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        message: "email is matched",
        data: myEmail.emailId,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  async deleteEmployee(employeesInput: IdforemployeesInput) {
    try {
      const { id } = employeesInput;
      const deleteEmployee = await this.repository.deleteEmployeeById(id);
      if (!deleteEmployee) {
        return errorResData(false, message.employeeIsNotDeleted, []);
      }
      return { success: true, data: deleteEmployee };
    } catch (error: any) {
      return errorResData(false, message.employeeIsNotDeleted, error.message);
    }
  }
  async updateEmployee(
    employeesInput: EmployeesInput,
    id: IdforemployeesInput
  ) {
    try {
      const updateEmployee = await this.repository.updateEmployee(
        employeesInput,
        id
      );
      if (updateEmployee === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateEmployee };
    } catch (error: any) {
      return errorResData(false, message.employeeIsNotUpdated, error.message);
    }
  }
  checkEmpoloyeeNumber = async (EmployeeNumber: string, agencyId: any) => {
    try {
      const myPassCode = await this.repository.checkEmployeeNumberIsExist(
        EmployeeNumber,
        agencyId
      );
      if (!myPassCode) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        message: "EmployeeNumber is matched",
        data: myPassCode.passcode,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
}
