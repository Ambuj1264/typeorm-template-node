import "dotenv/config";
import express from "express";
import cors from "cors";
import { user } from "./api/user";
import { agency } from "./api/agency";
import { country } from "./api/country";
import { state } from "./api/state";
import { role } from "./api/role";
import { employee } from "./api/org_employees";
import { Cleint } from "./api/org_client";
import { Task } from "./api/task";
import { assignedService } from "./api/assignedServices";

import { Services } from "./api/services";
import { Dashboard } from "./api/dashboard";
import { routes } from "./api/apiDocs/swaggerRoutes";

import { visit } from "./api/visit";
import { SMTP } from "./config";

const corsOptions = {
  origin: SMTP.origin,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export const expressApp = async (app: any) => {
  app.use(cors(corsOptions));
  process.env.TZ = "America/Chicago";
    app.use(express.json());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(express.static(__dirname + "/public"));
  app.use("/apiDocs", routes);
  agency(app);
  user(app);
  country(app);
  state(app);
  role(app);
  employee(app);
  Cleint(app);
  Task(app);
  assignedService(app);
  Services(app);
  Dashboard(app);
  visit(app);
  app.post("/*", async (req: express.Request, res: express.Response) => {
    res.status(404).send({
      message: "url is not valid",
    });
  });
};
