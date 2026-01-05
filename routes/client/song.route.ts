import * as controller from "../../controllers/client/song.controller";
import { Router } from "express";

const router: Router = Router();
router.get("/:slugTopic", controller.list);
router.get("/detail/:slugSong", controller.detail);
router.patch("/like/:typeLike/:idSong", controller.like);

export const songRoutes: Router = router;
