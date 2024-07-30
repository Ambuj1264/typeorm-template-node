import { agencyServices } from "../service";
import { BaseResponse } from "../utils/base-response";
import { Request, Response } from "express";
import {
  CreateAgencyInput,
  GetAgencyInput,
  DeleteAgencyInput,
  UpdateAgencyInput,
  IdforUpdatedAgencyInput,
} from "../input-type/agency";

import { userAuth } from "./middlewares/auth";
export const agency = async (app: any) => {
  app.post("/createAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const createAgencyInputs: CreateAgencyInput = req.body;
    oResponse.data = await agencyServices.createAgency(createAgencyInputs);
    oResponse.send();
  });
  app.post("/getAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const getAgencyInputs: GetAgencyInput = req.body;
    oResponse.data = await agencyServices.getAgency(getAgencyInputs);
    oResponse.send();
  });
  app.post("/filterAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const searchInput: string = req.body;
    oResponse.data = await agencyServices.fileterAgency(searchInput);
    oResponse.send();
  });
  app.post(
    "/getEmployeeByAgency",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const getAgencyInputs: GetAgencyInput = req.body;
      oResponse.data = await agencyServices.getEmployeeByAgency(
        getAgencyInputs
      );
      oResponse.send();
    }
  );
  app.post("/getAllAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    oResponse.data = await agencyServices.getAllAgency();
    oResponse.send();
  });
  app.post("/deleteAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const deleteAgencyInputs: DeleteAgencyInput = req.body;
    oResponse.data = await agencyServices.deleteAgency(deleteAgencyInputs);
    oResponse.send();
  });

  app.post("/updateAgency", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateAgencyInputs: UpdateAgencyInput = req.body;
    const forUpdatedAgencyInputs: IdforUpdatedAgencyInput = req.body.id;
    oResponse.data = await agencyServices.updateAgency(
      updateAgencyInputs,
      forUpdatedAgencyInputs
    );

    oResponse.send();
  });
};
