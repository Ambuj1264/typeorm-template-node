import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "SYS_COUNTRY" })
export class SysCountry extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({
    name: "COUNTRY_CODE",
    unique: true,
    // primary: true,
    nullable: false,
    length: 3,
  })
  COUNTRY_CODE: string;

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({ name: "COUNTRY_NAME", nullable: false })
  COUNTRY_NAME: string;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
