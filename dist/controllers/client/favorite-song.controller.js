"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
const moment_1 = __importDefault(require("moment"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
//[GET] /favorite-songs
const index = async (req, res) => {
    const favoriteSongs = await favorite_song_model_1.default.find({
        // userId: "",
        deleted: false,
    });
    for (const item of favoriteSongs) {
        const infoSong = await song_model_1.default.findOne({
            _id: item["songId"],
        });
        const infoSinger = await singer_model_1.default.findOne({
            _id: infoSong?.singerId,
        });
        item["infoSong"] = infoSong;
        item["infoSinger"] = infoSinger;
        item["createdAtFormatted"] = item.createdAt
            ? (0, moment_1.default)(item.createdAt).format("DD/MM/YYYY")
            : "";
    }
    //   console.log("favoriteSongs", favoriteSongs);
    res.render("client/page/favorite-songs/index", {
        pageTitle: "Bài hát yêu thích",
        favoriteSongs,
    });
};
exports.index = index;
