"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.result = void 0;
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const convertToSlug_1 = require("../../helpers/convertToSlug");
//[Get] /search/:type
const result = async (req, res) => {
    const type = req.params.type;
    const keyword = typeof req.query.keyword === "string" ? req.query.keyword : "";
    let newSongs = [];
    if (keyword) {
        const keywordRegex = new RegExp(keyword, "i");
        //tạo ra slug không dấu có thêm dấu (-) ngăn cách
        const stringSlug = (0, convertToSlug_1.convertToSlug)(keyword);
        const stringSlugRegex = new RegExp(stringSlug, "i");
        // console.log("stringSlug", stringSlug);
        const songs = await song_model_1.default.find({
            $or: [
                { title: { $regex: keywordRegex } },
                { slug: { $regex: stringSlugRegex } },
            ],
        });
        for (const item of songs) {
            const infoSinger = await singer_model_1.default.findOne({
                _id: item.singerId,
            });
            // (item as any)["infoSinger"] = infoSinger;
            newSongs.push({
                id: item._id,
                title: item.title,
                avatar: item.avatar,
                like: item.like,
                slug: item.slug,
                infoSinger: infoSinger?.fullName,
            });
        }
        // newSongs = songs;
    }
    switch (type) {
        case "result":
            return res.render("client/page/search/result", {
                pageTitle: `kết quả: ${keyword}`,
                keyword: keyword,
                songs: newSongs,
            });
        case "suggest":
            return res.json({
                code: 200,
                message: "success",
                songs: newSongs,
            });
        default:
            return res.status(404).json({ code: 404, message: "Not found" });
    }
};
exports.result = result;
