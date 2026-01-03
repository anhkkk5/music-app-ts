import Topic from "../../models/topic.model";
import { Request, Response, Router } from "express";

const router: Router = Router();
router.get("/", async (req: Request, res: Response) => {
  const topics = await Topic.find({ deleted: false });
  console.log(topics);
  res.render("client/page/topics/index", { topics });
});

export const topicRoutes: Router = router;
