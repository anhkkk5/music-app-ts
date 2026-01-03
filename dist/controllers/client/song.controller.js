"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
// [GET] /songs/:slugTopic
const list = async (req, res) => {
    console.log(req.params.slugTopic);
    const topic = await topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        status: "active",
        deleted: false,
    });
    console.log(topic);
    if (!topic) {
        return res.status(404).render("client/page/songs/list", {
            pageTitle: "Topic not found",
            songs: [],
        });
    }
    const songs = await song_model_1.default.find({
        topicId: topic.id,
        status: "active",
        deleted: false,
    })
        .select("avatar title slug singerId like")
        .lean();
    for (const song of songs) {
        const infoSinger = await singer_model_1.default.findOne({
            _id: song.singerId,
            status: "active",
            deleted: false,
        })
            .select("fullName slug")
            .lean();
        song.infoSinger = infoSinger;
    }
    res.render("client/page/songs/list", {
        pageTitle: topic?.title,
        songs: songs,
    });
};
exports.list = list;
