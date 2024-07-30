import { SysCountry } from "../entity/country";

export class CountryRepository {
  async createCountry(data: any) {
    return SysCountry.save(data);
  }

  async findCountry(COUNTRY_CODE: any) {
    return SysCountry.findOne({
      where: { COUNTRY_CODE: COUNTRY_CODE, isDelated: false },
    });
  }

  async findCountryById(id: any) {
    return SysCountry.findOne({
      where: { id: id, isDelated: false },
    });
  }
  async findAll() {
    SysCountry.find({
      where: { isDelated: false },
    });
  }

  async updateCountry(data: any, id: any) {
    const updateCountry = await SysCountry.findOne({
      where: { id: id, isDelated: false },
    });

    if (!updateCountry) {
      return false;
    }
    SysCountry.merge(updateCountry, data);
    const result = await SysCountry.save(updateCountry);
    if (!result) {
      return false;
    }
    return result;
  }
}
