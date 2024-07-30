import { DataSource } from "typeorm";
import { DBConfig } from ".././config";

export const AppDataSource = new DataSource({
  ...DBConfig,
  synchronize: true,
  entities: ["src/database/entity/**/*.ts"],
  migrations: ["src/database/migration/**/*.ts"],
  subscribers: ["src/database/subscriber/**/*.ts"],
});