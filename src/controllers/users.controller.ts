import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../database/models/user.model";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const users: User[] = await User.findAll();

      return res.send(users);
    } catch (error) {
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: User = await User.create(req.body);

      return res.status(201).send(user);
    } catch (error) {
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },

  login: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password }: { email: string; password: string } = req.body;

      const user: User | null = await User.findOne({
        where: {
          email,
          password
        }
      });

      if (!user) {
        return res.status(401).send({ status: 401, message: "Invalid Credentials" });
      }

      const { id, name }: { id: number; name: string; } = user;
      const token = jwt.sign({ id, name, email }, "access_token", { expiresIn: "1h" });

      return res.send({ token, name, email });
    } catch (error) {
      return res.status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  }
};
