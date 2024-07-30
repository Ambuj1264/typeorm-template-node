import { OrgClients } from "../entity/org_clients";
import { ILike } from "typeorm";

export class ClientRepository {
  async createClient(data: any) {
    const clientResult = await OrgClients.save(data);
    return { clientResult };
  }

  async findClient(emailId: any) {
    return OrgClients.findOne({
      where: { emailId: emailId, isDelated: false },
    });
  }
  async fileterClients(search: any) {
    return OrgClients.find({
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
  async findClientById(id: any) {
    return OrgClients.findOne({
      where: { id: id, isDelated: false },
    });
  }
  async findAll(agencyId: any) {
    return OrgClients.find({
      where: { agencyId: agencyId, isDelated: false },
      order: { createdOn: "desc" },
    });
  }
  async deleteClientById(id: any) {
    const findClient = await this.findClientById(id);
    // const deleteClient = await OrgClients.delete({ id: id, isDelated: false });
    if (!findClient) {
      return false;
    }
    findClient.isDelated = true;
    return OrgClients.save(findClient);
  }
  checkPass = async (passcode: any, agencyId: any) => {
    return OrgClients.findOne({
      where: {
        passcode: passcode,
        isDelated: false,
        agencyId,
      },
    });
  };
  async updateCleint(data: any, id: any) {
    const updateClient = await OrgClients.findOne({
      where: { id: id, isDelated: false },
    });

    if (!updateClient) {
      return false;
    }
    OrgClients.merge(updateClient, data);
    const result = await OrgClients.save(updateClient);
    if (!result) {
      return false;
    }
    return result;
  }
  checkClientNumberIsExist = async (ClientNumber: string, agencyId: string) => {
    return OrgClients.findOne({
      where: {
        ClientNumber,
        isDelated: false,
        agencyId,
      },
    });
  };
  listOfLanguage = async () => {
    return [
      {
        languageName: "English (US)",
        voice: "Woman",
        lang: "en-US",
        gender: "Female",
      },
      {
        languageName: "Russian (Russia)",
        voice: "Polly.Tatyana",
        lang: "ru-RU",
        gender: "Female",
      },
      {
        languageName: "Spanish (Mexico)",
        voice: "Woman",
        lang: "es-MX",
        gender: "Female",
      },
    ];
  };
}
