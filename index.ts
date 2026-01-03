import express from "express";
import type { Express, Request, Response } from "express";
import path from "path";
const app: Express = express();
const port: number = 3000;

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");

app.get("/topics", (req: Request, res: Response) => {
  res.render("client/page/topics/index");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
