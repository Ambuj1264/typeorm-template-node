import {
    BaseEntity,
    Column,
    Entity,
    Generated,
    PrimaryGeneratedColumn,
  } from "typeorm"; 
  
  @Entity({ name: "Login" })
  export class Login extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    @Generated("uuid")
    id: string;

    @Column({ name: "email", unique: true })
    email: string;

    @Column({ name: "password" })
    password: string;

    @Column({ name: "isActive", default: false })
    isActive: boolean;

    @Column({ name: "roleId" })
    roleId: string;

    @Column({ name: "salt" })
    salt: string;
    @Column({ name: "randomToken", nullable: true })
    randomToken: string;
    @Column({ name: "targetId", nullable: true })
    targetId: string;
    @Column({ name: "isDeleted", default: false })
    isDelated: boolean;

    @Column({ name: "createdOn", default: () => "CURRENT_TIMESTAMP" })
    createdOn: Date;

    @Column({ name: "updatedOn", default: () => "CURRENT_TIMESTAMP" })
    updatedOn: Date;
  }