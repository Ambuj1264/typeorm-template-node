import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "IvrTasks" })
export class IvrTasks extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "agencyId", nullable: true })
  agencyId: string;
  @Column({ name: "assignedServiceId", nullable: true })
  assignedServiceId: string;
  @Column({ name: "selectedTask", nullable: true, type: "jsonb" })
  selectedTask: string[];

  @Column({ name: "isDeleted", default: false })
  isDelated: boolean;

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
