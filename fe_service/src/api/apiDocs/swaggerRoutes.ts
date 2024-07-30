import express from "express";
export const routes = express.Router();
const swaggerUi = require("swagger-ui-express");
import AgencyDocs from "./agency.json";
import ClientDocs from "./client.json";
import EmployeeDocs from "./employee.json";
import stateDocs from "./state.json";
import country from "./country.json";
import ServicesDocs from "./services.json";
import taskDocs from "./task.json";
import userDocs from "./user.json";
import RoleDocs from "./role.json";
import AssignedServices from "./assignedServices.json";

routes.use(
  "/agency",
  swaggerUi.serveFiles(AgencyDocs),
  swaggerUi.setup(AgencyDocs)
);
routes.use(
  "/client",
  swaggerUi.serveFiles(ClientDocs),
  swaggerUi.setup(ClientDocs)
);
routes.use(
  "/employee",
  swaggerUi.serveFiles(EmployeeDocs),
  swaggerUi.setup(EmployeeDocs)
);
routes.use(
  "/state",
  swaggerUi.serveFiles(stateDocs),
  swaggerUi.setup(stateDocs)
);
routes.use("/country", swaggerUi.serveFiles(country), swaggerUi.setup(country));
routes.use(
  "/services",
  swaggerUi.serveFiles(ServicesDocs),
  swaggerUi.setup(ServicesDocs)
);
routes.use("/task", swaggerUi.serveFiles(taskDocs), swaggerUi.setup(taskDocs));
routes.use("/user", swaggerUi.serveFiles(userDocs), swaggerUi.setup(userDocs));
routes.use("/role", swaggerUi.serveFiles(RoleDocs), swaggerUi.setup(RoleDocs));
routes.use(
  "/assignedServices",
  swaggerUi.serveFiles(AssignedServices),
  swaggerUi.setup(AssignedServices)
);
