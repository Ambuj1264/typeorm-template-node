import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "visits" })
export class Visits extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "assignedServiceId" })
  assignedServiceId: string;
  @Column({ name: "agencyId", nullable: true })
  agencyId: string;
  @Column({
    name: "startVisit",
    nullable: true,
  })
  startVisit: Date;
  @Column({ name: "endVisit", nullable: true })
  endVisit: Date;
  @Column({ name: "isDeleted", default: false })
  isDeleted: boolean;

  @Column({ name: "isApproved", default: false })
  isApproved: boolean;
  @Column({ name: "isRejected", default: false })
  isRejected: boolean;
  @Column({ name: "exported", default: false })
  exported: boolean;

  @Column({ name: "comment", default: false, nullable: true })
  comment: string;

  @Column({ name: "taskList", nullable: true, type: "jsonb" })
  taskList: string;
  @Column({ name: "createdOn", default: () => "CURRENT_TIMESTAMP" })
  createdOn: Date;

  @Column({ name: "updatedOn", default: () => "CURRENT_TIMESTAMP" })
  updatedOn: Date;
}

