export interface CreateAgencyInput {
  AGENCY_NAME?: string;
  SHORT_NAME: string;
  FEDERAL_TAX_ID: string;
  PRY_CONTACT_REF_ID: string;
  ADDR_HOUSE_NO: string;
  ADDR_LINE1: string;
  ADDR_LOCALITY: string;
  ADDR_CITY: string;
  ADDR_STATE: string;
  ADDR_COUNTRY: string;
  POSTAL_CODE: string;
  EMAIL_ID: string;
  PRI_PHONE_NUM: string;
  ALT_PHONE_NUM: string;
  PASSWORD: string;
  PASSCODE: string;
}
export interface UpdateAgencyInput extends CreateAgencyInput {
  id: string;
}
export interface IdforUpdatedAgencyInput {
  id: string;
}
export interface GetAgencyInput {
  id: string;
}

export interface DeleteAgencyInput {
  id: string;
}
