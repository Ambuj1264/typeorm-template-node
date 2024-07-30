import { Clinetservice } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { ClientInput, IdforClientInput } from "../input-type/client";
import { BaseResponse } from "../utils/base-response";

export const Cleint = async (app: any) => {
  app.post("/createClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const clientInputs: ClientInput = req.body;
    oResponse.data = await Clinetservice.createClient(clientInputs);
    oResponse.send();
  });

  app.post("/getClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const clientInputs: IdforClientInput = req.body;
    // try {
    oResponse.data = await Clinetservice.getClient(clientInputs);
    // } catch (err) {
    //   oResponse.loadException(err);
    // }
    oResponse.send();
  });
  app.post(
    "/checkPasscodeForClient",
    userAuth,
    async (req: any, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const { passcode }: any = req.body;
      const { targetId } = req.user;
      const agencyId = targetId;
      oResponse.data = await Clinetservice.checkPasscode(passcode, agencyId);
      oResponse.send();
    }
  );
  app.post("/filterClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const searchInput: any = req.body;
    oResponse.data = await Clinetservice.fileterClient(searchInput);
    oResponse.send();
  });
  app.post("/getAllClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const agencyId: any = req.body.agencyId;
    oResponse.data = await Clinetservice.getAllClient(agencyId);

    oResponse.send();
  });
  app.post("/deleteClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const clientInputs: IdforClientInput = req.body;
    oResponse.data = await Clinetservice.deleteClient(clientInputs);
    oResponse.send();
  });

  app.post("/updateClient", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const clientInputs: ClientInput = req.body;
    const forUpdatedCleintInput: IdforClientInput = req.body.id;
    oResponse.data = await Clinetservice.updateClient(
      clientInputs,
      forUpdatedCleintInput
    );

    oResponse.send();
  });
  app.post("/checkClientNumber", userAuth, async (req: any, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const { ClientNumber } = req.body;
    const { targetId } = req?.user;
    const agencyId = targetId;
    oResponse.data = await Clinetservice.checkClientNumber(
      ClientNumber,
      agencyId
    );
    oResponse.send();
  });
  app.post(
    "/ivrLanguageList",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      oResponse.data = await Clinetservice.ivrLanguage();
      oResponse.send();
    }
  );
};
