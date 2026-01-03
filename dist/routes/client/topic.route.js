"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicRoutes = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const topics = await topic_model_1.default.find({ deleted: false });
    console.log(topics);
    res.render("client/page/topics/index", { topics });
});
exports.topicRoutes = router;
