import { BaseResponse } from "../utils/base-response";
import { Request, Response } from "express";
import { userAuth } from "./middlewares/auth";
import { visitServices } from "../service";
import { SearchManual, SearchObj, VisitInput } from "../input-type/visit";

export const visit = async (app: any) => {
  app.post(
    "/createManageVisit",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const manageData: VisitInput = req.body;
      oResponse.data = await visitServices.manageVisitCreate(manageData);
      oResponse.send();
    }
  );
  app.post("/getManageVisit", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const manageIds: any = req.body;
    oResponse.data = await visitServices.manageVisitGet(manageIds);
    oResponse.send();
  });
  app.post("/filterVisit", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const searchObjs: SearchObj = req.body;
    oResponse.data = await visitServices.filterVisits(searchObjs);
    oResponse.send();
  });
  app.post(
    "/filterVisitForManualSearch",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const searchObjs: SearchManual = req.body;
      oResponse.data = await visitServices.manualSearch(searchObjs);
      oResponse.send();
    }
  );
  app.post("/allVisit", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const { agencyId }: any = req.body;
    oResponse.data = await visitServices.fullVisit(agencyId);
    oResponse.send();
  });
  app.post(
    "/getVisitAndExport",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const data: any = req.body;
      oResponse.data = await visitServices.exportAndUpdate(data, res);
      oResponse.send();
    }
  );
  app.post(
    "/updateIsApproved",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const { ids }: any = req.body;
      oResponse.data = await visitServices.updateApproved(ids);

      oResponse.send();
    }
  );
  app.post(
    "/updateSingleVisit",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const VisitData: any = req.body;

      oResponse.data = await visitServices.updateSingleVisit(VisitData);

      oResponse.send();
    }
  );
  app.post(
    "/updateVistExportStatus",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const data: any = req.body;
      oResponse.data = await visitServices.updateVistExportStatus(data);
      oResponse.send();
    }
  );
};
