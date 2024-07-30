import { Response } from "express";
import { VistiRepository } from "../database/repository/visit";
import { SearchManual, SearchObj } from "../input-type/visit";
import { errorResData } from "../utils";
import { message } from "../utils/message";
export class VisitServices {
  public repository: VistiRepository;

  constructor() {
    this.repository = new VistiRepository();
  }

  manageVisitCreate = async (manageData: any) => {
    try {
      const existingAssignedServices =
        await this.repository.manageCreateAssignedServices(manageData);
      if (!existingAssignedServices) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: existingAssignedServices };
    } catch (error) {
      return errorResData(false, message.dataNotFound, error);
    }
  };
  manageVisitGet = async (manageData: any) => {
    try {
      const existingAssignedServices =
        await this.repository.manageGetAssignedVisit(manageData);
      if (existingAssignedServices.length == 0) {
        return {
          success: true,
          message: "NO VISIT",
          data: existingAssignedServices,
        };
      }
      return { success: true, data: existingAssignedServices };
    } catch (error) {
      return errorResData(false, message.dataNotFound, error);
    }
  };
  filterVisits = async (searchObj: SearchObj) => {
    try {
      const findAssginedServices = await this.repository.filterVisits(
        searchObj
      );
      if (!findAssginedServices) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: findAssginedServices,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  manualSearch = async (searchObj: SearchManual) => {
    try {
      const findAssginedServices =
        await this.repository.filterVisitsForManualSearch(searchObj);
      if (!findAssginedServices) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: findAssginedServices,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  fullVisit = async (agencyId: any) => {
    try {
      const getAllVisit = await this.repository.getFullVisit(agencyId);
      if (!getAllVisit) {
        return errorResData(false, message.dataNotFound, []);
      }
      return {
        success: true,
        data: getAllVisit,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  exportAndUpdate = async (data: any, res: Response) => {
    try {
      const updateAndExport = await this.repository.export(data, res);

      if (!updateAndExport) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: updateAndExport,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  updateApproved = async (ids: any) => {
    try {
      const update = await this.repository.updateApporoved(ids);

      if (update.affected === 0) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: update,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
  updateSingleVisit = async (data: any) => {
    try {
      const update = await this.repository.updateVisit(data);

      if (!update) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: update,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };

  updateVistExportStatus = async (data: any) => {
    try {
      if (!data?.visit_Ids?.length) {
        return errorResData(false, message.dataNotFound, []);
      }
      const updateVisit = await this.repository.updateAllVisitFalse(
        data?.visit_Ids
      );

      if (!updateVisit) {
        return errorResData(false, message.dataNotFound, []);
      }

      return {
        success: true,
        data: updateVisit,
      };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  };
}
