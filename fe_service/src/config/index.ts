import yenv from "yenv";
const env = yenv("env.yaml", { env: "development" });

export const DBConfig = {
  type: env.DB_TYPE,
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
};

export const PORT = env.PORT;
export const APP_SECRET = env.APP_SECRET;
export const ArrayKey = env.ArrayKey;

export const SMTP = {
  host: env.SMTP_HOST,
  user: env.SMTP_USER,
  password: env.SMTP_PASSWORD,
  secure: false,
  origin: env.ORIGIN,
  TZ: env.TZ,
};


