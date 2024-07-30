import { roleServices } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { RoleInput } from "../input-type/role";
import { BaseResponse } from "../utils/base-response";

export const role = async (app: any) => {
  app.post("/createRole", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const RoleInputs: RoleInput = req.body;
    oResponse.data = await roleServices.createRole(RoleInputs);
    oResponse.send();
  });
};
