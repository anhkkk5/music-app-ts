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

    song.infoSinger = infoSinger;
  }
  res.render("client/page/songs/list", {
    pageTitle: topic?.title,
    songs: songs,
  });
};
