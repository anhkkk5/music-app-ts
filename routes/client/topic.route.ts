import * as controller from "../../controllers/client/topic.controller";
import { Router } from "express";

const router: Router = Router();
router.get("/", controller.topics);

export const topicRoutes: Router = router;
