import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "org_clients" })
export class OrgClients extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;
  @Column({ name: "agencyId", nullable: true })
  agencyId: string;

  @Column({ name: "title", nullable: true })
  title: string;

  @Column({ name: "firstName" })
  firstName: string;

  @Column({ name: "middleName", nullable: true })
  middleName: string;

  @Column({ name: "lastName", nullable: true })
  lastName: string;

  @Column({ name: "aliasName", nullable: true })
  aliasName: string;

  @Column({ name: "gender" })
  gender: string;

  @Column({ name: "ssn", nullable: true })
  ssn: string;

  @Column({ name: "dateOfBirth" })
  dateOfBirth: string;

  @Column({ name: "maritalStatus", nullable: true })
  maritalStatus: string;

  @Column({ name: "employmentStatus", nullable: true })
  employmentStatus: string;

  @Column({ name: "clientStatus", nullable: true })
  contactReference: string;

  @Column({ name: "referralType", nullable: true })
  referralType: string;

  @Column({ name: "referral", nullable: true })
  referral: string;
  @Column({ name: "emailId" })
  emailId: string;
  @Column({ name: "state", nullable: true })
  state: string;
  @Column({ name: "contactsReference", nullable: true })
  contactsReference: string;
  @Column({ name: "preferredContactMethod", nullable: true })
  preferredContactMethod: string;
  @Column({ name: "maNumber", nullable: true })
  maNumber: string;
  @Column({ name: "physicians", nullable: true })
  physicians: string;
  @Column({ name: "payorProviderNumbers", nullable: true })
  payorProviderNumbers: string;

  @Column({ name: "approvedDate", nullable: true })
  approvedDate: string;
  @Column({ name: "intakeApprovedBy", nullable: true })
  intakeApprovedBy: string;
  @Column({ name: "intakeNotes", nullable: true })
  intakeNotes: string;
  @Column({ name: "assessmentNotes", nullable: true })
  assessmentNotes: string;
  @Column({ name: "welcomeLetterDate", nullable: true })
  welcomeLetterDate: string;
  @Column({ name: "dateOfAssessment", nullable: true })
  dateOfAssessment: string;
  @Column({ name: "assessmentDoneBy", nullable: true })
  assessmentDoneBy: string;
  @Column({ name: "customAttributes", nullable: true })
  customAttributes: string;
  @Column({ name: "onboardingStage", nullable: true })
  onboardingStage: string;
  @Column({ name: "identity", nullable: true })
  identity: string;
  @Column({ name: "caseManagerId", nullable: true })
  caseManagerId: string;
  @Column({ name: "rejectionReasonCode", nullable: true })
  rejectionReasonCode: string;

  @Column({ name: "isActive", nullable: true })
  isActive: string;

  @Column({ name: "readyStatus", nullable: true })
  readyStatus: string;
  @Column({ name: "passcode", nullable: false })
  passcode: string;

  @Column({ name: "age", nullable: true })
  age?: string;

  @Column({ name: "phoneNumber", nullable: true })
  phoneNumber?: string;

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;
  @Column({ name: "ClientNumber", nullable: true })
  ClientNumber?: string;
  @Column({ name: "clientIvrLanguage", nullable: true, type: "jsonb" })
  clientIvrLanguage?: string;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  @Column({
    name: "updatedOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
