import { ILike, In } from "typeorm";
import { Services } from "../entity/services";
import { TaskRequest } from "../entity/task";

export class ServicesRepository {
  async createServices(data: any) {
    return Services.save(data);
  }

  async findServicesById(id: any) {
    return Services.findOne({
      where: { id: id, isDelated: false },
    });
  }
  async filterSerVice(search: any) {
    return Services.find({
      where: [
        {
          serviceName: ILike(`%${search.search}%`),
          agencyId: search.agencyId,
          isDelated: false,
        },
      ],
    });
  }
  async findServicesAll(targetId: string) {
    let services = await Services.find({
      where: {
        isDelated: false,
        agencyId: targetId,
      },
    });
    for (const service of services) {
      if (service.task && service.task.length > 0) {
        const task: any = service.task;

        const taskIds = task.map((taskItem: any) => taskItem?.taskId);
        const tasks: any = await TaskRequest.find({
          where: {
            id: In(taskIds),
            isDelated: false,
          },
        });
        service.task = tasks;
      } else {
        service.task = "";
      }
    }
    return services;
  }

  async deleteServicesById(id: any) {
    const findServices = await this.findServicesById(id);
    if (!findServices) {
      return false;
    }
    findServices.isDelated = true;
    return Services.save(findServices);
  }

  async updateServices(data: any, id: any) {
    const updateServices = await Services.findOne({
      where: { id: id, isDelated: false },
    });
    Services.merge(updateServices, data);
    const result = await Services.save(updateServices);
    if (!result) {
      return false;
    }
    return result;
  }
}
