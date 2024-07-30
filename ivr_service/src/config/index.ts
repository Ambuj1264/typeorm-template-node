import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });


export const DBConfig = {
  DB_TYPE: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
};

export const PORT = process.env.PORT;
export const FE_SERVICE_URL = env.FE_SERVICE_URL;
