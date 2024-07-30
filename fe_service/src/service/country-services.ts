import { CountryRepository } from "../database/repository/country-respository";
import { errorResData, resWarningData } from "../utils";
import { CountryInput, IdCountryInput } from "../input-type/county";
import { message } from "../utils/message";
export class CountryService {
  public repository: CountryRepository;

  constructor() {
    this.repository = new CountryRepository();
  }
  async createCountry(countryInput: CountryInput) {
    try {
      const { COUNTRY_NAME, COUNTRY_CODE } = countryInput;
      const isExistingCountry = await this.repository.findCountry({
        COUNTRY_NAME,
        COUNTRY_CODE,
      });
      if (isExistingCountry) {
        return resWarningData(message.countryIsAlreadyExist);
      }
      const existingCountry = await this.repository.createCountry(countryInput);
      return { success: true, data: existingCountry };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotCreated, error.message);
    }
  }
  async getCountry(countryInput: IdCountryInput) {
    try {
      const { id } = countryInput;
      const findCountry = await this.repository.findCountryById(id);

      return { success: true, data: findCountry };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }
  async getAllCountry() {
    try {
      const findallCountry = await this.repository.findAll();

      return { success: true, data: findallCountry };
    } catch (error: any) {
      return errorResData(false, message.dataNotFound, error.message);
    }
  }

  async updateCountry(countryInput: CountryInput, id: IdCountryInput) {
    try {
      const updateCountry = await this.repository.updateCountry(
        countryInput,
        id
      );
      if (updateCountry === false) {
        return errorResData(false, message.dataIsNotUpdated, []);
      }
      return { success: true, data: updateCountry };
    } catch (error: any) {
      return errorResData(false, message.dataIsNotUpdated, error.message);
    }
  }
}
