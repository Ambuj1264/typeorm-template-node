import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "assignedServices" })
export class AssignedServices extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({
    name: "taskId",
    type: "jsonb",
  })
  taskId?: string;

  @Column({ name: "employeeId" })
  employeeId: string;

  @Column({ name: "clientId" })
  clientId: string;

  @Column({ name: "serviceId" })
  serviceId: string;
  @Column({ name: "agencyId", nullable: true })
  agencyId: string;

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;
  @Column({ name: "refrencId", nullable: true })
  refrencId: string;
  @Column({ name: "ServiceCode", nullable: true })
  ServiceCode: string;
  @Column({ name: "PayorName", nullable: true })
  PayorName: string;

  @Column({
    name: "serviceStatus",
    type: "enum",
    enum: ["inProgress", "completed", "open"],
    default: "open",
  })
  servicesStatus?: string;

  @Column({
    name: "employeeComment",
    nullable: true,
  })
  employeeComment: string;
  @Column({
    name: "isApproved",
    nullable: true,
    default: false,
  })
  isApproved: boolean;

  @Column({
    name: "startService",
    nullable: true,
  })
  startService: Date;
  @Column({ name: "endService", nullable: true })
  endService: Date;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
}
