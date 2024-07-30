import { dashboardService } from "../service";
import { BaseResponse } from "../utils/base-response";
import { Request, Response } from "express";
import { userAuth } from "./middlewares/auth";

export const Dashboard = async (app: any) => {
  app.post("/countDashboard", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const agencyId: any = req.body.agencyId;
    const roleId: any = req.body.roleId;
    oResponse.data = await dashboardService.CountDashboard(agencyId, roleId);
    oResponse.send();
  });
};
