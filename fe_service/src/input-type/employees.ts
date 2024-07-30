export interface EmployeesInput {
  agencyId?: string;
  employeeId?: string;
  emailId?: string;
  applicationId: string;
  EmployeeNumber?: string;
  payrollId?: string;
  npi?: string;
  title?: string;
  firstName: string;
  middleName: string;
  lastName: string;
  aliasName: string;
  gender: string;
  ssn?: string;
  dateOfBirth: number;
  state?: string;
  contactReference?: string;
  skillCodes?: string;
  backgroundCheck?: string;
  training?: string;
  education?: string;
  identity?: string;
  joiningDate: number;
  jobTitle?: string;
  onboardingStage?: string;
  payRates?: string;
  employeePayor?: string;
  customAttributes?: string;
  workHistory?: string;
  homeLocation?: string;
  welcomeLetterDate?: string;
  employeeStatus: string;
  rejectionReasonCode?: string;
  rejectionNotes?: string;
  relievingDate?: string;
  reportingManagerId?: string;
  lastUpdateduser?: string;
  createTimestamp?: string;
  updateTimestamp?: string;
  isActive?: string;
  reHired?: string;
  rehiringHistory?: string;
  renderingProviderEmpId?: string;
  age?: string;
  phoneNumber?: string;
  passcode?: string;
  isAvailable: boolean;
  isEmployee: boolean;
  isResponsibleParty: boolean;
}
export interface IdforemployeesInput {
  id: string;
}

export interface EmployeeNumber {
  EmployeeNumber: string;
}