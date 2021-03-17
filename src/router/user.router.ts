import { Router } from "express";
import controller from "../controllers/users.controller";

/**
 * @description User Router
 */
const router: Router = Router();

router.post("/login", controller.login);
router.get("/", controller.index);
router.post("/", controller.create);

export default router;
