import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "services" })
export class Services extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "serviceName" })
  serviceName: string;

  @Column({ name: "task", type: "jsonb", nullable: true })
  task?: string;
  @Column({ name: "adencyId", nullable: true })
  agencyId: string;
  @Column({ name: "ServiceLineCode", nullable: true })
  ServiceLine: string;
  @Column({ name: "ServiceCategory", nullable: true })
  ServiceCategory: string;
  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
