import { stateServices } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { StateInput, IdStateInput } from "../input-type/state";
import { BaseResponse } from "../utils/base-response";

export const state = async (app: any) => {
  app.post("/createState", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const CreateStateInput: StateInput = req.body;
    oResponse.data = await stateServices.createState(CreateStateInput);
    oResponse.send();
  });

  app.post("/getState", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const getStateInput: IdStateInput = req.body;
    oResponse.data = await stateServices.getState(getStateInput);
    oResponse.send();
  });
  app.post("/getAllState", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);

    oResponse.data = await stateServices.getAllState();
    oResponse.send();
  });

  app.post("/deleteState", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const deleteStateInput: IdStateInput = req.body;
    oResponse.data = await stateServices.deleteState(deleteStateInput);
    oResponse.send();
  });

  app.post("/updateState", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateStateInput: StateInput = req.body;
    const forUpdatedStateInput: IdStateInput = req.body.id;
    oResponse.data = await stateServices.updateState(
      updateStateInput,
      forUpdatedStateInput
    );
    oResponse.send();
  });
};
