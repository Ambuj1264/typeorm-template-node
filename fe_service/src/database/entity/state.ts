import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "SYS_STATE_CODES" })
export class SysStateCode extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({
    name: "STATE_CODE",
    unique: true,
    // primary: true,
    nullable: false,
    length: 3,
  })
  STATE_CODE: string;

  @Column({ name: "STATE_NAME", nullable: false })
  STATE_NAME: string;

  @Column({
    name: "COUNTRY_ID",
    nullable: false,
  })
  COUNTRY_ID: string;
  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
