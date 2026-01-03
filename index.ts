import express from "express";
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import * as database from "./config/database";
const app: Express = express();

dotenv.config();
const port = Number(process.env.PORT) || 3002;

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/page/topics/index");
});

const bootstrap = async () => {
  await database.connect();

  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

void bootstrap();
