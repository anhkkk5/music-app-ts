import { Router } from "express";
import multer from "multer";

const router: Router = Router();

import * as controller from "../../controllers/admin/song.controller";

const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post("/create", upload.single("avatar"), controller.createPost);

export const songRoutes: Router = router;
