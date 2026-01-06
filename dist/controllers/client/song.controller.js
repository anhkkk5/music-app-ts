"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
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
        console.log("infosinger", infoSinger);
        song.infoSinger = infoSinger;
    }
    res.render("client/page/songs/list", {
        pageTitle: topic?.title,
        songs: songs,
    });
};
exports.list = list;
// [GET] /songs/detail/:slugSong
const detail = async (req, res) => {
    const slugSong = req.params.slugSong;
    const song = await song_model_1.default.findOne({
        slug: slugSong,
        status: "active",
        deleted: false,
    });
    if (!song) {
        return res.status(404).render("client/page/songs/detail", {
            pageTitle: "Bài hát không tồn tại",
        });
    }
    const singer = await singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false,
    }).select("fullName");
    const topic = await topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false,
    }).select("title");
    // console.log("topic:", topic);
    // console.log("song:", song);
    const favoriteSong = await favorite_song_model_1.default.findOne({
        songId: song._id.toString(),
        // userId: req.user._id,
    });
    song["isFavorite"] = favoriteSong ? true : false;
    res.render("client/page/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song,
        singer: singer,
        topic: topic,
    });
};
exports.detail = detail;
//[PATCH] /songs/like/:typeLike/:idSong
const like = async (req, res) => {
    const idSong = req.params.idSong;
    const typeLike = req.params.typeLike;
    console.log("idSong:", idSong);
    console.log("typeLike:", typeLike);
    const song = await song_model_1.default.findOneAndUpdate({
        _id: idSong,
        status: "active",
        deleted: false,
    }, {
        $inc: { like: typeLike === "like" ? 1 : -1 },
    }, {
        new: true,
    }).select("like");
    // sau làm tính năng like dạng mảng chứa id của user chứ không làm số lượng like
    // để kiểm tra user đã like chưa (phải có auth session - cần thêm middleware xác thực)
    // và cập nhật mảng like với id người dùng
    res.json({ success: true, like: song?.like });
};
exports.like = like;
//[PATCH] /songs/favorite/:typeFavorite/:idSong
const favorite = async (req, res) => {
    const idSong = req.params.idSong;
    const typeFavorite = req.params.typeFavorite;
    switch (typeFavorite) {
        case "favorite":
            const existFavoriteSong = await favorite_song_model_1.default.findOne({
                songId: idSong,
            });
            if (!existFavoriteSong) {
                const newFavorite = new favorite_song_model_1.default({
                    songId: idSong,
                    // userId: req.user._id,sau làm thêm
                });
                await newFavorite.save();
            }
            break;
        case "unfavorite":
            const existFavorite = await favorite_song_model_1.default.findOne({
                songId: idSong,
                // userId: req.user._id,
            });
            if (existFavorite) {
                await favorite_song_model_1.default.deleteOne({
                    songId: idSong,
                    // userId: req.user._id,
                });
            }
            break;
        default:
            return res.status(400).json({ code: 400, message: "Invalid type" });
    }
    res.json({
        code: 200,
        message: "Thành công",
    });
};
exports.favorite = favorite;
//[PATCH] /songs/listen/:idSong
const listen = async (req, res) => {
    const idSong = req.params.idSong;
    const song = await song_model_1.default.findOneAndUpdate({
        _id: idSong,
        status: "active",
        deleted: false,
    }, {
        $inc: { listen: 1 },
    }, {
        new: true,
    }).select("listen");
    res.json({ success: true, listen: song?.listen });
};
exports.listen = listen;
