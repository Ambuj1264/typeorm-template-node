import { TaskRepository } from "../database/repository/task-repository";

import { TaskInput, IdforTaskInput } from "../input-type/task";
import { errorResData } from "../utils";
import { message } from "../utils/message";
export class TaskServices {
  public repository: TaskRepository;

  constructor() {
    this.repository = new TaskRepository();
  }
  async createTask(TaskInputs: TaskInput) {
    try {
      const existingTask = await this.repository.createTask(TaskInputs);
      if (existingTask === false) {
        return errorResData(false, message.taskIsAlreadyCreated, []);
      }
      return { success: true, data: existingTask };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotCreated, error.message);
    }
  }
  async getTask(TaskInputs: IdforTaskInput) {
    try {
      const { id } = TaskInputs;
      const findTask = await this.repository.findTaskById(id);
      if (!findTask) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findTask };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllTask(targetId: any) {
    try {
      const findTask = await this.repository.findAll(targetId);
      if (!findTask) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findTask };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteTask(TaskInputs: IdforTaskInput) {
    try {
      const { id } = TaskInputs;
      const deleteTask = await this.repository.deleteTaskById(id);
      if (!deleteTask) {
        return errorResData(false, message.dataIsNotDeleted, []);
      }
      return { success: true, data: deleteTask };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
  async updateTask(TaskInputs: TaskInput, id: IdforTaskInput) {
    try {
      const updateTask = await this.repository.updateTask(TaskInputs, id);
      if (updateTask === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateTask };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
  async filterTask(targetId:any, search: any) {
    try {
      const findServices = await this.repository.filterTask(targetId,search);
      if (!findServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findServices };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
}
