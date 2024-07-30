import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "TaskRequest " })
export class TaskRequest extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;
  @Column({ name: "taskName", nullable: true })
  taskName: string;
  @Column({ name: "agencyId", nullable: true })
  agencyId: string;
  @Column({ name: "taskCategory", nullable: true })
  taskCategory: string;

  @Column({ name: "taskType", nullable: true })
  taskType: string;

  @Column({ name: "taskStatus", nullable: true })
  taskStatus: string;

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;
  @Column({ name: "ActivityID", nullable: true })
  ActivityID: number;
  @CreateDateColumn({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;
  @UpdateDateColumn({
    name: "updatedOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateOn: Date;
}
