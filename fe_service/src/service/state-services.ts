import { StateRepository } from "../database/repository/state-repository";

import { StateInput, IdStateInput } from "../input-type/state";
import { errorResData, resWarningData } from "../utils";
import { message } from "../utils/message";
export class StateServices {
  public repository: StateRepository;

  constructor() {
    this.repository = new StateRepository();
  }
  async createState(stateInput: StateInput) {
    try {
      const { STATE_CODE } = stateInput;
      const isExistingState = await this.repository.findState({
        STATE_CODE,
      });
      if (isExistingState) {
        resWarningData(message.stateIsAlreadyExist);
      }
      const existingState = await this.repository.createState(stateInput);
      return { success: true, data: existingState };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotCreated, error.message);
    }
  }
  async getState(stateInput: IdStateInput) {
    try {
      const { id } = stateInput;
      const findState = await this.repository.findStateById(id);
      if (!findState) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findState };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllState() {
    try {
      const findState = await this.repository.findAll();
      if (!findState) {
        return errorResData(false, message.dataNotFound, []);
      }
      return { success: true, data: findState };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async deleteState(stateInput: IdStateInput) {
    try {
      const { id } = stateInput;
      const deleteState = await this.repository.deleteStateById(id);
      if (!deleteState) {
        return errorResData(false, message.dataIsNotDeleted, []);
      }
      return { success: true, data: deleteState };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotDeleted, error.message);
    }
  }
  async updateState(countryInput: StateInput, id: IdStateInput) {
    try {
      const updateState = await this.repository.updateState(countryInput, id);
      if (updateState === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateState };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
}
