import express from "express";
import { routes } from "./routes/routes";

const AppInitialize = () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.listen(3000, () => console.log("Server running!"));
};

AppInitialize();
