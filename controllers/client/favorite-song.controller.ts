import { Request, Response } from "express";
import moment from "moment";
import FavoriteSong from "../../models/favorite-song.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";
//[GET] /favorite-songs
export const index = async (req: Request, res: Response) => {
  const favoriteSongs = await FavoriteSong.find({
    // userId: "",
    deleted: false,
  });

  for (const item of favoriteSongs) {
    const infoSong = await Song.findOne({
      _id: item["songId"],
    });

    const infoSinger = await Singer.findOne({
      _id: infoSong?.singerId,
    });

    (item as any)["infoSong"] = infoSong;
    (item as any)["infoSinger"] = infoSinger;
    (item as any)["createdAtFormatted"] = item.createdAt
      ? moment(item.createdAt).format("DD/MM/YYYY")
      : "";
  }

  //   console.log("favoriteSongs", favoriteSongs);
  res.render("client/page/favorite-songs/index", {
    pageTitle: "Bài hát yêu thích",
    favoriteSongs,
  });
};
