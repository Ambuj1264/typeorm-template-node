import { assignedServices } from "../service";
import { BaseResponse } from "../utils/base-response";
import { Request, Response } from "express";
import {
  IdInputForAssignedServices,
  AssigendServicesInputArray,
  ServiceObj,
} from "../input-type/assignedServices";

import { userAuth } from "./middlewares/auth";
export const assignedService = async (app: any) => {
  app.post(
    "/createAssignedServices",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const createAssignedServicesInput: AssigendServicesInputArray = req.body;
      oResponse.data = await assignedServices.createAssignedSevices(
        createAssignedServicesInput
      );
      oResponse.send();
    }
  );
  app.post(
    "/getAssignedServices",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const getAssignedServicesInput: IdInputForAssignedServices = req.body;
      oResponse.data = await assignedServices.getAssignedServices(
        getAssignedServicesInput
      );
      oResponse.send();
    }
  );

  app.post(
    "/getAllAssignedServices",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const agencyId: any = req.body.agencyId;
      oResponse.data = await assignedServices.getAllAssignedServices(agencyId);
      oResponse.send();
    }
  );
  app.post(
    "/getAllAssignedServicesForCompletedStatus",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const clientId: any = req.body.clientId;
      oResponse.data =
        await assignedServices.getAllAssignedServicesForServiceStatus(clientId);
      oResponse.send();
    }
  );
  app.post(
    "/deleteAssignedServices",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const refrencId: string = req.body;
      oResponse.data = await assignedServices.deleteAssignedServices(refrencId);
      oResponse.send();
    }
  );

  app.post(
    "/updateAssignedServices/:refrencId",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);

      const createAssignedServicesInput: AssigendServicesInputArray = req.body;
      const refrencId: any = req.params.refrencId;

      oResponse.data = await assignedServices.updateAssignedServices(
        createAssignedServicesInput,
        refrencId
      );
      oResponse.send();
    }
  );
  app.post(
    "/filterAssginedServices",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const searchInput: any = req.body;
      oResponse.data = await assignedServices.filterAssginedServices(
        searchInput
      );
      oResponse.send();
    }
  );
  app.post(
    "/filterAssignedServiceByStartAndEnd",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const searchObj: any = req.body;
      oResponse.data = await assignedServices.filterVisits(searchObj);
      oResponse.send();
    }
  );
    app.post(
      "/changeStatusForAssignedService",
      userAuth,
      async (req: Request, res: Response) => {
        const oResponse = new BaseResponse(req, res);
        const serviceStatusObj: ServiceObj = req.body;
        oResponse.data = await assignedServices.changeStatusForAssignedService(
          serviceStatusObj
        );
        oResponse.send();
      }
    );
      app.post(
        "/onLoadingUpdate",
        userAuth,
        async (req: Request, res: Response) => {
          const oResponse = new BaseResponse(req, res);
          const { agencyId }: any = req.body;
          oResponse.data = await assignedServices.onLoadingUpdate(agencyId);
          oResponse.send();
        }
      );
};
