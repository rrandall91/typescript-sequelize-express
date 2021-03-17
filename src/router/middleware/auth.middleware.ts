import { Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * @description Authentication Middleware
 */
export default async (req: Request, res: Response, next: () => void): Promise<void | Response<Record<string, unknown>>> => {
  const token: string | undefined = req.headers.authorization;

  if (token) {
    const decoded = jwt.verify(token, "access_token");
    
    req.body.authUser = decoded;
  } else {
    return res.status(401).send({ status: 401, message: "Unauthenticated" });
  }

  return next();
};
