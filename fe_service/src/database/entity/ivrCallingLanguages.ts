import {
  BaseEntity,
  Column,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "IvrCallingLanguages" })
export class IvrCallingLanguages extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  @Generated("uuid")
  id: string;

  @Column({ name: "language" })
  language: string;

  @Column({ name: "languageId" })
  languageId: string;

  @Column({ name: "type" })
  type: boolean;

  @Column({ name: "gender" })
  gender: boolean;
  @Column({ name: "voiceName" })
  voiceName: boolean;

  @Column({
    name: "createdOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdOn: Date;

  @Column({
    name: "updatedOn",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedOn: Date;
}
