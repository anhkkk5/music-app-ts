"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.set("views", path_1.default.join(process.cwd(), "views"));
app.set("view engine", "pug");
app.get("/topics", (req, res) => {
    res.render("client/page/topics/index");
});
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
