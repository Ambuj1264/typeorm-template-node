import { ILike } from "typeorm";
import { TaskRequest } from "../entity/task";

export class TaskRepository {
  async createTask(data: any) {
    const checkAcitivityId = await TaskRequest.findOne({
      where: {
        isDelated: false,
        agencyId: data.agencyId,
        ActivityID: data.ActivityID,
      },
    });
    if (checkAcitivityId) {
      return false;
    } else {
      return TaskRequest.save(data);
    }
  }

  async findAll(targetId: any) {
    return TaskRequest.find({
      where: { isDelated: false, agencyId: targetId },
      order: { createdOn: "desc" },
    });
  }

  async findTaskById(id: any) {
    return TaskRequest.findOne({
      where: { id: id, isDelated: false },
    });
  }
  async deleteTaskById(id: any) {
    const findTask = await this.findTaskById(id);
    if (!findTask) {
      return false;
    }
    findTask.isDelated = true;
    return TaskRequest.save(findTask);
  }

  async updateTask(data: any, id: any) {
    const updateTask = await TaskRequest.findOne({
      where: { id: id, isDelated: false },
    });
    if (!updateTask) {
      return false;
    }
    console.log(updateTask, data);
    TaskRequest.merge(updateTask, data);
    const result = await TaskRequest.save(updateTask);
    if (!result) {
      return false;
    }
    return result;
  }
  async filterTask(targetId: any, search: any) {
    return TaskRequest.find({
      where: [
        {
          taskName: ILike(`%${search.search}%`),
          agencyId: targetId,
          isDelated: false,
        },
      ],
    });
  }
}
