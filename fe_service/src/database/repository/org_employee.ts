import { OrgEmployees } from "../entity/org_employees";
import { ILike } from "typeorm";
export class EmployeesRepository {
  async createEmployee(data: any) {
    return OrgEmployees.save(data);
  }

  async findEmployee(emailId: any) {
    return OrgEmployees.findOne({
      where: { emailId: emailId, isDelated: false },
    });
  }
  async findAll(data: any) {
    return OrgEmployees.find({
      where: { agencyId: data, isDelated: false },
      order: { createdOn: "desc" },
    });
  }
  async fileterEmployees(search: any) {
    return OrgEmployees.find({
      where: [
        {
          firstName: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
        {
          lastName: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
        {
          emailId: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
        {
          passcode: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
        {
          phoneNumber: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
      ],
    });
  }
  async findEmployeeById(id: any) {
    return OrgEmployees.findOne({
      where: { id: id, isDelated: false },
    });
  }
  checkPass = async (passcode: any, agencyId: any) => {
    return OrgEmployees.findOne({
      where: {
        passcode: passcode,
        isDelated: false,
        agencyId,
      },
    });
  };
  checkEmailId = async (email: any, agencyId: any) => {
    return OrgEmployees.findOne({
      where: {
        emailId: email,
        agencyId,
        isDelated: false,
      },
    });
  };
  async deleteEmployeeById(id: any) {
    const findEmployee = await this.findEmployeeById(id);

    if (!findEmployee) {
      return false;
    }
    findEmployee.isDelated = true;
    return OrgEmployees.save(findEmployee);
  }

  async updateEmployee(data: any, id: any) {
    const updateEmployee = await OrgEmployees.findOne({
      where: { id: id, isDelated: false },
    });

    if (!updateEmployee) {
      return false;
    }
    OrgEmployees.merge(updateEmployee, data);
    const result = await OrgEmployees.save(updateEmployee);
    if (!result) {
      return false;
    }
    return result;
  }
  checkEmployeeNumberIsExist = async (
    EmployeeNumber: string,
    agencyId: string
  ) => {
    return OrgEmployees.findOne({
      where: {
        EmployeeNumber: EmployeeNumber,
        isDelated: false,
        agencyId,
      },
    });
  };
}
