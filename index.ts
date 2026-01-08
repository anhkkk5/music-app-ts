import express, { Express } from "express";
import dotenv from "dotenv";
import path from "path";
import { connect } from "./config/database";
import clientRoutes from "./routes/client/index.route";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/config";

dotenv.config();
const port = Number(process.env.PORT) || 3002;

const app: Express = express();

// Body parser (chuẩn Express)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");

// TinyMCE
app.use(
  "/tinymce",
  express.static(path.join(process.cwd(), "node_modules", "tinymce"))
);

// App locals
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// Routes
clientRoutes(app);
adminRoutes(app);

const bootstrap = async () => {
  await connect();
  app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
};

void bootstrap();
