 import { UserService } from "./user-service";
import { AgencyService } from "./agency-services";
import { CountryService } from "./country-services";
import { StateServices } from "./state-services";
import { RoleServices } from "./role-services";
import { EmployeeService } from "./org_employee";
import { Clientservice } from "./org_client";
import { TaskServices } from "./task-services";
import { AssignedServices } from "./assignedServices";
import { Services } from "./services";
import { DashboardService } from "./dashboard";
import { VisitServices } from "./visit";

const userService = new UserService();
const agencyServices = new AgencyService();
const countryServices = new CountryService();
const stateServices = new StateServices();
const roleServices = new RoleServices();
const org_employees = new EmployeeService();
const Clinetservice = new Clientservice();
const taskServices = new TaskServices();
const assignedServices = new AssignedServices();
const service = new Services();
const dashboardService = new DashboardService();
const visitServices = new VisitServices();

export {
  userService,
  agencyServices,
  countryServices,
  stateServices,
  roleServices,
  org_employees,
  Clinetservice,
  taskServices,
  assignedServices,
  service,
  dashboardService,
  visitServices,
};
