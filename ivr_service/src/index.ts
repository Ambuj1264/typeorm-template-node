import express from "express";
import { PORT } from "./config"; 
import { expressApp } from "./express-app"; 
const { AppDataSource } = require("./database/connection");

const StartServer = async () => {
  const app = express();

  await AppDataSource.initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err: any) => {
      console.error("Error during Data Source initialization", err);
    });

  await expressApp(app);

  app
    .listen(PORT, () => {
      console.log(`listening to port ${PORT}`);
    })
    .on("error", (error: any) => {
      console.log(error);
      process.exit();
    })
    .on("close", () => {
    console.log("close");
    });
};

StartServer();