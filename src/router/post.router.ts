import { Router } from "express";
import controller from "../controllers/posts.controller";
import authMiddleware from "./middleware/auth.middleware";

const router: Router = Router();

router.get("/", controller.index);

router.use(authMiddleware);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
