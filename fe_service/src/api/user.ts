import { userService } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import {
  SignupRequest,
  LoginRequest,
  ResetPassword,
  VerifyToken,
} from "../input-type/auth";
import { BaseResponse } from "../utils/base-response";

export const user = async (app: any) => {
  app.post("/signup", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const userInputs: SignupRequest = req.body;
    oResponse.data = await userService.signUp(userInputs);
    oResponse.send();
  });

  app.post("/login", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const userInputs: LoginRequest = req.body;
    oResponse.data = await userService.signIn(userInputs);
    oResponse.send();
  });

  app.get("/profile", userAuth, async (req: any, res: Response) => {
    const { id } = req.user;
    const oResponse = new BaseResponse(req, res);
    oResponse.data = await userService.getProfile(id);
    oResponse.send();
  });

  app.get("/whoami", (req: Request, res: Response) => {
    return res.status(200).json({ msg: "/FEservice : I am FE Service" });
  });
  app.post("/sendForgetMail", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const userInputs: LoginRequest = req.body;
    oResponse.data = await userService.sendForgetMail(userInputs);
    oResponse.send();
  });
  app.post("/verifyForgetPassword", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const userInputs: VerifyToken = req.body;
    oResponse.data = await userService.verifyUser(userInputs);
    oResponse.send();
  });
  app.post("/verifyToken", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const token: VerifyToken = req.body;
    oResponse.data = await userService.verifyToken(token);
    oResponse.send();
  });
  app.post("/resetPassword", async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const userInputs: ResetPassword = req.body;
    oResponse.data = await userService.resetPassword(userInputs);
    oResponse.send();
  });
    app.get("/", (req: Request, res: Response) => {
      return res.status(200).json({ msg: "Api is working Properly" });
    });
};
