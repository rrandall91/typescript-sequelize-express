import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => res.status(400).send({ status: 400, message: "Invalid Request" }));

export default router;
