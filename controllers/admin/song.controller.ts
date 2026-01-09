import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

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
  interface DataSong {
    title: string;
    topicId: string;
    singerId: string;
    description: string;
    status: string;
    avatar: string;
    audio: string;
  }

  const dataSong: DataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    description: req.body.description,
    status: "active",
    avatar: req.body.avatar,
    audio: req.body.audio,
  }; //tránh để user thay đổi thông tin

  const song = await Song.create(dataSong);

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
};
