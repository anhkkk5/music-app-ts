import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";

//[GET] /admin/songs
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false,
  });
  res.render("admin/pages/songs/index", {
    pageTitle: "Quản lý bài hát",
    songs: songs,
  });
};

//[Get] /admin/songs/create
export const create = async (req: Request, res: Response) => {
  const topic = await Topic.find({
    deleted: false,
    status: "active",
  }).select("title");

  const singer = await Singer.find({
    deleted: false,
    status: "active",
  }).select("fullName");
  res.render("admin/pages/songs/create", {
    pageTitle: "Thêm bài hát",
    topic: topic,
    singer: singer,
  });
};

//[POST] /admin/songs/create
export const createPost = async (req: Request, res: Response) => {
  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: "active",
    avatar: req.body.avatar,
  };

  const song = await Song.create(dataSong);

  res.send(song);
};
