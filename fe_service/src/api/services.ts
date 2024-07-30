import { service } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { ServiceInput, IdforServiceInput } from "../input-type/services";
import { BaseResponse } from "../utils/base-response";

export const Services = async (app: any) => {
  app.post("/createServices", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const ServiceInputs: ServiceInput = req.body;
    oResponse.data = await service.createService(ServiceInputs);
    oResponse.send();
  });

  app.post("/getServices", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const getServicesInput: IdforServiceInput = req.body;
    oResponse.data = await service.getService(getServicesInput);
    oResponse.send();
  });
  app.post("/getAllServices", userAuth, async (req: any, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const { targetId }: any = req.user;
    oResponse.data = await service.getAllServices(targetId);
    oResponse.send();
  });
  app.post("/filterServices", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const search: string = req.body;
    oResponse.data = await service.filterServices(search);
    oResponse.send();
  });
  app.post("/deleteServices", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const deleteServicesInput: IdforServiceInput = req.body;
    oResponse.data = await service.deleteServices(deleteServicesInput);
    oResponse.send();
  });

  app.post("/updateServices", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateServicesInput: ServiceInput = req.body;
    const forUpdatedServicesInput: IdforServiceInput = req.body.id;
    oResponse.data = await service.updateServices(
      updateServicesInput,
      forUpdatedServicesInput
    );
    oResponse.send();
  });
};
