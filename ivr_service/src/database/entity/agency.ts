import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "SYS_AGENCY" })
export class Agency extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "AGENCY_NAME" })
  AGENCY_NAME: string;
  @Column({ name: "SHORT_NAME" })
  SHORT_NAME: string;

  @Column({ name: "FEDERAL_TAX_ID", nullable: true })
  FEDERAL_TAX_ID: string;

  @Column({ name: "PRY_CONTACT_REF_ID", nullable: true })
  PRY_CONTACT_REF_ID: string;

  @Column({ name: "ADDR_HOUSE_NO" })
  ADDR_HOUSE_NO: string;

  @Column({ name: "ADDR_LINE1" })
  ADDR_LINE1: string;

  @Column({ name: "ADDR_LINE2", nullable: true })
  ADDR_LINE2: string;

  @Column({ name: "ADDR_LOCALITY", nullable: true })
  ADDR_LOCALITY: string;

  @Column({ name: "ADDR_CITY" })
  ADDR_CITY: string;

  @Column({ name: "ADDR_STATE" })
  ADDR_STATE: string;

  @Column({ name: "ADDR_COUNTRY", default: "US", nullable: true })
  ADDR_COUNTRY: string;

  @Column({ name: "POSTAL_CODE" })
  POSTAL_CODE: string;

  @Column({ name: "PRI_PHONE_NUM", unique: true })
  PRI_PHONE_NUM: string;

  @Column({ name: "EMAIL_ID", nullable: true })
  EMAIL_ID: string;

  @Column({ name: "ALT_PHONE_NUM", nullable: true })
  ALT_PHONE_NUM: string;
  @Column({ name: "PASSCODE", nullable: true })
  PASSCODE: string;

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({ name: "createdOn", default: () => "CURRENT_TIMESTAMP" })
  createdOn: Date;

  @Column({ name: "updatedOn", default: () => "CURRENT_TIMESTAMP" })
  updatedOn: Date;
}
