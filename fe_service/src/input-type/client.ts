export interface ClientInput {
  agencyId?: string;
  clientId?: string;
  passcode?: string;
  title?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  aliasName?: string;
  gender?: string;
  ssn?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  employmentStatus?: string;
  contactReference?: string;
  referralType?: string;
  referral?: string;
  emailId?: string;
  state?: string;
  contactsReference?: string;
  preferredContactMethod?: string;
  maNumber?: string;
  physicians?: string;
  payorProviderNumbers?: string;
  approvedDate?: string;
  intakeApprovedBy?: string;
  intakeNotes?: string;
  assessmentNotes?: string;
  welcomeLetterDate?: string;
  dateOfAssessment?: string;
  assessmentDoneBy?: string;
  customAttributes?: string;
  onboardingStage?: string;
  identity?: string;
  caseManagerId?: string;
  rejectionReasonCode?: string;
  isActive?: string;
  readyStatus?: string;
  age?: string;
  phoneNumber?: string;
  ClientNumber?: string;
  clientIvrLanguage?: JSON;
}

export interface IdforClientInput {
  id: string;
}
export interface ClientNumber {
  ClientNumber: string;
}
