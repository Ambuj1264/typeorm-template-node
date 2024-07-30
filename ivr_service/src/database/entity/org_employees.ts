import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "org_employees" })
export class OrgEmployees extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "EmployeeNumber", nullable: true })
  EmployeeNumber: string;

  @Column({ name: "payrollId", nullable: true })
  payrollId: string;

  @Column({ name: "npi", nullable: true })
  npi: string;

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

  @Column({ name: "emailId" })
  emailId: string;

  @Column({ name: "state" })
  state: string;

  @Column({ name: "contactReference", nullable: true })
  contactReference: string;

  @Column({ name: "skillCodes", nullable: true })
  skillCodes: string;

  @Column({ name: "backgroundCheck", nullable: true })
  backgroundCheck: string;
  @Column({ name: "training", nullable: true })
  training: string;
  @Column({ name: "education", nullable: true })
  education: string;
  @Column({ name: "identity", nullable: true })
  identity: string;
  @Column({ name: "joiningDate", nullable: true })
  joiningDate: string;
  @Column({ name: "jobTitle", nullable: true })
  jobTitle: string;
  @Column({ name: "onboardingStage", nullable: true })
  onboardingStage: string;
  @Column({ name: "payRates", nullable: true })
  payRates: string;

  @Column({ name: "employeePayor", nullable: true })
  employeePayor: string;
  @Column({ name: "customAttributes", nullable: true })
  customAttributes: string;
  @Column({ name: "workHistory", nullable: true })
  workHistory: string;
  @Column({ name: "homeLocation", nullable: true })
  homeLocation: string;
  @Column({ name: "welcomeLetterDate", nullable: true })
  welcomeLetterDate: string;
  @Column({ name: "employeeStatus", nullable: true })
  employeeStatus: string;
  @Column({ name: "rejectionReasonCode", nullable: true })
  rejectionReasonCode: string;
  @Column({ name: "rejectionNotes", nullable: true })
  rejectionNotes: string;
  @Column({ name: "relievingDate", nullable: true })
  relievingDate: string;
  @Column({ name: "reportingManagerId", nullable: true })
  reportingManagerId: string;
  @Column({ name: "lastUpdateduser", nullable: true })
  lastUpdateduser: string;
  @Column({ name: "createTimestamp", nullable: true })
  createTimestamp: string;
  @Column({ name: "updateTimestamp", nullable: true })
  updateTimestamp: string;
  @Column({ name: "isActive", nullable: true })
  isActive: string;
  @Column({ name: "reHired", nullable: true })
  reHired: string;
  @Column({ name: "rehiringHistory", nullable: true })
  rehiringHistory: string;
  @Column({ name: "renderingProviderEmpId", nullable: true })
  renderingProviderEmpId: string;
  @Column({ name: "age", nullable: true })
  age?: string;
  @Column({ name: "phoneNumber", nullable: true })
  phoneNumber?: string;
  @Column({ name: "passcode", nullable: true })
  passcode?: string;
  @Column({ name: "selfApproved", nullable: true, default: false })
  selfApproved: boolean;
  @Column({ name: "isAvailable", default: true })
  isAvailable: boolean;
  @Column({ name: "isEmployee", nullable: true })
  isEmployee: string;
  @Column({ name: "isResponsibleParty", nullable: true })
  isResponsibleParty: string;
  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({ name: "agencyId" })
  @Generated("uuid")
  agencyId: string;
}
