import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "SYS_ROLES" })
export class SysRoles extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "ROLE_ID", primary: true })
  ROLE_ID: string;

  @Column({ name: "ROLE_NAME" })
  ROLE_NAME: string;
  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
