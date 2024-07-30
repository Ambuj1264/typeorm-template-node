import { org_employees } from "../service";
import { userAuth } from "../api/middlewares/auth";
import { Request, Response } from "express";
import { EmployeesInput, IdforemployeesInput } from "../input-type/employees";
import { BaseResponse } from "../utils/base-response";

export const employee = async (app: any) => {
  app.post("/createEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const employeesnput: EmployeesInput = req.body;
    oResponse.data = await org_employees.createEmployee(employeesnput);
    oResponse.send();
  });
  app.post("/filterEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const searchInput: any = req.body;
    oResponse.data = await org_employees.fileterEmployee(searchInput);
    oResponse.send();
  });
  app.post("/getEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const employeeInputs: IdforemployeesInput = req.body;
    // try {
    oResponse.data = await org_employees.getEmployee(employeeInputs);
    // } catch (err) {
    //   oResponse.loadException(err);
    // }
    oResponse.send();
  });
  app.post("/getAllEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const agencyId: any = req.body.agencyId;
    oResponse.data = await org_employees.getAllEmployee(agencyId);
    oResponse.send();
  });

  app.post("/deleteEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const deleteEmployeeInput: IdforemployeesInput = req.body;
    oResponse.data = await org_employees.deleteEmployee(deleteEmployeeInput);
    oResponse.send();
  });

  app.post(
    "/checkPasscodeforEmployee",
    userAuth,
    async (req: any, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const { passcode }: any = req.body;
      const { targetId } = req?.user;
      const agencyId = targetId;
      oResponse.data = await org_employees.checkPasscode(passcode, agencyId);
      oResponse.send();
    }
  );
  app.post(
    "/checkEmailforEmployee",
    userAuth,
    async (req: Request, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const { email, agencyId }: any = req.body;
      oResponse.data = await org_employees.checkEmail(email, agencyId);
      oResponse.send();
    }
  );
  app.post("/updateEmployee", userAuth, async (req: Request, res: Response) => {
    const oResponse = new BaseResponse(req, res);
    const updateEmployeeInput: EmployeesInput = req.body;
    const forUpdatedEmployeeInput: IdforemployeesInput = req.body.id;
    oResponse.data = await org_employees.updateEmployee(
      updateEmployeeInput,
      forUpdatedEmployeeInput
    );

    oResponse.send();
  });

  app.post(
    "/checkEmployeeNumber",
    userAuth,
    async (req: any, res: Response) => {
      const oResponse = new BaseResponse(req, res);
      const { EmployeeNumber } = req.body;
      const { targetId } = req?.user;
      const agencyId = targetId;
      oResponse.data = await org_employees.checkEmpoloyeeNumber(
        EmployeeNumber,
        agencyId
      );
      oResponse.send();
    }
  );
};
