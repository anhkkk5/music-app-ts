import { Request, Response } from "express";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
import { convertToSlug } from "../../helpers/convertToSlug";

export const result = async (req: Request, res: Response) => {
  const keyword: string =
    typeof req.query.keyword === "string" ? req.query.keyword : "";

  let newSongs: unknown = [];
  if (keyword) {
    const keywordRegex = new RegExp(keyword, "i");

    //tạo ra slug không dấu có thêm dấu (-) ngăn cách
    const stringSlug = convertToSlug(keyword);
    const stringSlugRegex = new RegExp(stringSlug, "i");
    console.log("stringSlug", stringSlug);
    const songs = await Song.find({
      $or: [
        { title: { $regex: keywordRegex } },
        { slug: { $regex: stringSlugRegex } },
      ],
    });
    for (const item of songs) {
      const infoSinger = await Singer.findOne({
        _id: item.singerId,
      });
      (item as any)["infoSinger"] = infoSinger;
    }
    newSongs = songs;
  }
  res.render("client/page/search/result", {
    pageTitle: `kết quả: ${keyword}`,
    keyword: keyword,
    songs: newSongs,
  });
};
