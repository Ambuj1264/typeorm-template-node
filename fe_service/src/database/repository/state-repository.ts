import { SysCountry } from "../entity/country";
import { SysStateCode } from "../entity/state";

export class StateRepository {
  async createState(data: any) {
    return SysStateCode.save(data);
  }

  async findState(STATE_CODE: any) {
    return SysStateCode.findOne({
      where: STATE_CODE,
    });
  }

  async findStateById(id: any) {
    return SysStateCode.createQueryBuilder("state")
      .leftJoinAndSelect(
        SysCountry,
        "country",
        "(country.id)::uuid= (state.COUNTRY_ID)::uuid"
      )
      .getOne();
  }
  async findAll() {
    return SysStateCode.find({
      where: { isDelated: false },
    });
  }
  async deleteStateById(id: any) {
    const findDeleted = await this.findStateById(id);
    if (!findDeleted) {
      return false;
    }
    findDeleted.isDelated = true;
    return SysStateCode.save(findDeleted);
  }

  async updateState(data: any, id: any) {
    const updateState = await SysStateCode.findOne({
      where: { id: id, isDelated: false },
    });
    if (!updateState) {
      return false;
    }
    SysStateCode.merge(updateState, data);
    const result = await SysStateCode.save(updateState);
    if (!result) {
      return false;
    }
    return result;
  }
}
