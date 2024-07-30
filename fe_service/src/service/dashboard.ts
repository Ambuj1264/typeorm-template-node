import { OrgClients } from "../database/entity/org_clients";
import { Agency } from "../database/entity/agency";
import { OrgEmployees } from "../database/entity/org_employees";

import { errorResData, resWarningData } from "../utils";
import { message } from "../utils/message";
import { AssignedServices } from "../database/entity/assignedServices";

export class DashboardService {
  async CountDashboard(agencyId: any, roleId: any) {
    try {
      if (roleId == "1") {
        const countAgency = await Agency.count({ where: { isDelated: false } });
        const employeeCount = await OrgEmployees.count({
          where: { isDelated: false },
        });
        const clientCount = await OrgClients.count({
          where: { isDelated: false },
        });
        const serviceStatusCount = await AssignedServices.count({
          where: { servicesStatus: "completed", isDelated: false },
        });
        if (
          !(countAgency || employeeCount || clientCount || serviceStatusCount)
        ) {
          return resWarningData(message.dataNotFound);
        }
        return {
          success: true,
          count: {
            agencyCount: countAgency,
            employeeCount: employeeCount,
            clientCount: clientCount,
            completedServiceCount: serviceStatusCount,
          },
        };
      } else {
        const assinedServicesOpen = await AssignedServices.count({
          where: {
            servicesStatus: "open",
            agencyId: agencyId,
            isDelated: false,
          },
        });

        const employeeCount = await OrgEmployees.count({
          where: { agencyId: agencyId, isDelated: false },
        });

        const clientCount = await OrgClients.count({
          where: { agencyId: agencyId, isDelated: false },
        });

        const serviceStatusCount = await AssignedServices.count({
          where: {
            servicesStatus: "completed",
            agencyId: agencyId,
            isDelated: false,
          },
        });
        return {
          success: true,
          count: {
            assinedServicesOpen: assinedServicesOpen,
            employeeCount: employeeCount,
            clientCount: clientCount,
            completedServiceCount: serviceStatusCount,
          },
        };
      }
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
}
