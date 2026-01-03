"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const index_route_1 = __importDefault(require("./routes/client/index.route"));
dotenv_1.default.config();
const port = Number(process.env.PORT) || 3002;
const app = (0, express_1.default)();
app.set("views", path_1.default.join(process.cwd(), "views"));
app.set("view engine", "pug");
//clientRoutes
(0, index_route_1.default)(app);
const bootstrap = async () => {
    await (0, database_1.connect)();
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    });
};
void bootstrap();
