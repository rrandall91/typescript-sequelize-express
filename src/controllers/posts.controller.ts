import { Request, Response } from "express";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const posts: Post[] = await Post.findAll({ include: User });
      
      return res.send(posts);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authUser } = req.body;
      const post: Post = await Post.create({ ...req.body, userId: authUser.id });
      
      return res.status(201).send(post);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { authUser } = req.body;

      const post: Post | null = await Post.findOne({
        where: {
          id,
          userId: authUser.id,
        }
      });
      
      if (!post) {
        return res.status(400).send({ status: 400, message: "Invalid Request! Post does not exist or user does not have access." });
      }
      
      return post.update(req.body)
        .then((p) => res.send(p));
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },

  destroy: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { authUser } = req.body;

      const post: Post | null = await Post.findOne({
        where: {
          id,
          userId: authUser.id,
        },
      });
      
      if (!post) {
        return res.status(400).send({ status: 400, message: "Invalid Request! Post does not exist or user does not have access.." });
      }
      
      await post.destroy();
          
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },
};
