"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
//[GET] /admin/songs
const index = async (req, res) => {
    const songs = await song_model_1.default.find({
        deleted: false,
    });
    res.render("admin/pages/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs,
    });
};
exports.index = index;
//[POST] /admin/songs/create
const create = async (req, res) => {
    const topic = await topic_model_1.default.find({
        deleted: false,
        status: "active",
    }).select("title");
    const singer = await singer_model_1.default.find({
        deleted: false,
        status: "active",
    }).select("fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm bài hát",
        topic: topic,
        singer: singer,
    });
};
exports.create = create;
