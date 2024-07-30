import "dotenv/config";
import express from "express";

import { IVRCallService } from "./api/IvrCall";
process.env.TZ = "America/Chicago";
export const expressApp = async (app: any) => {
  app.use(express.json());
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  app.use(express.static(__dirname + "/public"));

  IVRCallService(app);
};
