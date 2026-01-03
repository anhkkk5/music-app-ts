"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.topics = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
//[GET] /topics
const topics = async (req, res) => {
    const topics = await topic_model_1.default.find({ deleted: false });
    console.log(topics);
    res.render("client/page/topics/index", {
        pageTitle: "Chủ đề bài hát",
    });
};
exports.topics = topics;
