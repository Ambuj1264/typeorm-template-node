import { countryServices } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { CountryInput, IdCountryInput } from "../input-type/county";
import { BaseResponse } from "../utils/base-response";

export const country = async (app: any) => {
  app.post("/createCountry", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const CreateCountryInput: CountryInput = req.body;
    oResponse.data = await countryServices.createCountry(CreateCountryInput);
    oResponse.send();
  });
  app.post("/getCountry", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const getCountryInput: IdCountryInput = req.body;
    oResponse.data = await countryServices.getCountry(getCountryInput);
    oResponse.send();
  });
  app.post("/getAllCountry", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    oResponse.data = await countryServices.getAllCountry();
    oResponse.send();
  });

  app.post("/updateCountry", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateCountryInput: CountryInput = req.body;
    const forUpdatedCountryInput: IdCountryInput = req.body.id;
    oResponse.data = await countryServices.updateCountry(
      updateCountryInput,
      forUpdatedCountryInput
    );

    oResponse.send();
  });
};
