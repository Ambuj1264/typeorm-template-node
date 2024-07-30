import { Agency } from "../entity/agency";
import { Login } from "../entity/login";
import { OrgEmployees } from "../entity/org_employees";
import { ILike } from "typeorm";
export class AgencyRepository {
  async createAgency(data: any) {
   return Agency.save(data);
  }

  async findAgency(EMAIL_ID: any) {
     return Agency.findOne({
       where: { EMAIL_ID: EMAIL_ID, isDelated: false },
     });
 
  }

  async findAgencyById(id: any) {
    return Agency.findOne({
      where: { id: id, isDelated: false },
    });

  }
  async findEmployeesByAgencyId(id: any) {
    return (
      OrgEmployees.createQueryBuilder("OrgEmployees")
        .select("OrgEmployees")
        .where("OrgEmployees.agencyId = :id", { id: id })
        // .andWhere("participant.orderId = :orderId", { orderId: order.id })
        .getMany()
    );


  }
  async findAll() {
    return Agency.find({
      where: { isDelated: false },

      order: { createdOn: "desc" },
    });

  }
  async fileterAgency(search: any) {
   return Agency.find({
     where: [
       { AGENCY_NAME: ILike(`%${search.search}%`), isDelated: false },
       { SHORT_NAME: ILike(`%${search.search}%`), isDelated: false },
       { EMAIL_ID: ILike(`%${search.search}%`), isDelated: false },
       { PRI_PHONE_NUM: ILike(`%${search.search}%`), isDelated: false },
       { PASSCODE: ILike(`%${search.search}%`), isDelated: false },
     ],
   });

  
  }
  async deleteAgencyById(id: any) {
    const findAgency = await this.findAgencyById(id);

    const findLoging = await Login.findOne({
      where: {
        isDelated: false,
        targetId: id,
      },
    });

    if (findAgency && findLoging) {
      findAgency.isDelated = true;
      findLoging.isDelated = true;
      const deleteAgency = await Agency.save(findAgency);
      const deleteLogin = await Login.save(findLoging);
      if (!(deleteAgency || deleteLogin)) {
        return false;
      }
      return deleteAgency;
    } else {
      return false;
    }
    // const deleteAgency = await Agency.delete({ id: id });
    // const deleteUser = await Login.delete({ targetId: id });
  }

  async updateAgency(data: any, id: any) {
    const updateAgency = await Agency.findOne({
      where: { id: id, isDelated: false },
    });
    const updateLogin = await Login.findOne({
      where: {
        targetId: id,
        isDelated: false,
      },
    });

    if (!(updateAgency && updateLogin)) {
      return false;
    } else {
      updateLogin.email = data.EMAIL_ID;
      await Login.save(updateLogin);
      Agency.merge(updateAgency, data);
      const result = await Agency.save(updateAgency);
      if (!result) {
        return false;
      }
      return result;
    }
  }
}
