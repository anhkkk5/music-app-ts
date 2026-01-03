import * as controller from "../../controllers/client/song.controller";
import { Router } from "express";

const router: Router = Router();
router.get("/:slugTopic", controller.list);

export const songRoutes: Router = router;
