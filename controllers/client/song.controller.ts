import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Song from "../../models/song.model";
import Singer from "../../models/singer.model";

// [GET] /songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  console.log(req.params.slugTopic);
  const topic = await Topic.findOne({
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

  const songs = await Song.find({
    topicId: topic.id,
    status: "active",
    deleted: false,
  })
    .select("avatar title slug singerId like")
    .lean();

  for (const song of songs as any[]) {
    const infoSinger = await Singer.findOne({
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

// [GET] /songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const slugSong: string = req.params.slugSong;

  const song = await Song.findOne({
    slug: slugSong,
    status: "active",
    deleted: false,
  });

  if (!song) {
    return res.status(404).render("client/page/songs/detail", {
      pageTitle: "Bài hát không tồn tại",
    });
  }

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false,
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false,
  }).select("title");
  // console.log("topic:", topic);
  // console.log("song:", song);
  res.render("client/page/songs/detail", {
    pageTitle: "Chi tiết bài hát",
    song: song,
    singer: singer,
    topic: topic,
  });
};

//[PATCH] /songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  const idSong: string = req.params.idSong;
  const typeLike: string = req.params.typeLike;
  console.log("idSong:", idSong);
  console.log("typeLike:", typeLike);

  const song = await Song.findOneAndUpdate(
    {
      _id: idSong,
      status: "active",
      deleted: false,
    },
    {
      $inc: { like: typeLike === "like" ? 1 : -1 },
    },
    {
      new: true,
    }
  ).select("like");

  // sau làm tính năng like dạng mảng chứa id của user chứ không làm số lượng like
  // để kiểm tra user đã like chưa (phải có auth session - cần thêm middleware xác thực)
  // và cập nhật mảng like với id người dùng

  res.json({ success: true, like: song?.like });
};
