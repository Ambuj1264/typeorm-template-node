import { taskServices } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { TaskInput, IdforTaskInput } from "../input-type/task";
import { BaseResponse } from "../utils/base-response";

export const Task = async (app: any) => {
  app.post("/createTask", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const CreateTaskInput: TaskInput = req.body;
    oResponse.data = await taskServices.createTask(CreateTaskInput);
    oResponse.send();
  });

  app.post("/getTask", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const getTaskInput: IdforTaskInput = req.body;
    oResponse.data = await taskServices.getTask(getTaskInput);
    oResponse.send();
  });
  app.post("/getAllTask", userAuth, async (req: any, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const { targetId }: any = req.user;
    oResponse.data = await taskServices.getAllTask(targetId);
    oResponse.send();
  });
  app.post("/deleteTask", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const deleteTaskInput: IdforTaskInput = req.body;
    oResponse.data = await taskServices.deleteTask(deleteTaskInput);
    oResponse.send();
  });

  app.post("/updateTask", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateTaskInput: TaskInput = req.body;
    const forUpdatedTaskInput: IdforTaskInput = req.body.id;
    oResponse.data = await taskServices.updateTask(
      updateTaskInput,
      forUpdatedTaskInput
    );
    oResponse.send();
  });

  app.post("/filterTask", userAuth, async (req: any, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const search: string = req.body;
    const { targetId } = req.user;
    oResponse.data = await taskServices.filterTask(targetId, search);
    oResponse.send();
  });
};
