import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./config/database";
import clientRoutes from "./routes/client/index.route";

dotenv.config();
const port = Number(process.env.PORT) || 3002;
const app: Express = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");
//clientRoutes
clientRoutes(app);

const bootstrap = async () => {
  await connect();

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

void bootstrap();
