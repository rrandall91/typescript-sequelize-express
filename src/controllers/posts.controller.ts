import { Request, Response } from "express";
import Post from "../database/models/post.model";

export default {
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const posts: Post[] = await Post.findAll();
      
      return res.send(posts);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },

  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const post: Post = await Post.create(req.body);
      
      return res.status(201).send(post);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },

  update: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const post: Post | null = await Post.findByPk(id);
      
      if (!post) {
        return res.status(400).send({ status: 400, message: "Invalid Request! Post does not exist." });
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
      const post: Post | null = await Post.findByPk(id);
      
      if (!post) {
        return res.status(400).send({ status: 400, message: "Invalid Request! Post does not exist." });
      }
      
      await post.destroy();
          
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).send({ status: 500, message: "Fatal error!", error });
    }
  },
};
