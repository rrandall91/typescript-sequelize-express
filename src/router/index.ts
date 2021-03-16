import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/", async (req: Request, res: Response): Promise<Response> => {
    return res.status(400).send({ status: 400, message: "Invalid request" });
});

export default router;