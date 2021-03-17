import { Request, Response } from "express";
import Post from "../database/models/post.model";
import User from "../database/models/user.model";

export default {

  /**
   * @description Retrieve a list of posts
   * @returns Post[] - A list of posts.
   * @throws 500 - Fatal Error.
   */
  index: async (req: Request, res: Response): Promise<Response> => {
    try {
      const posts: Post[] = await Post.findAll({ include: User });

      return res.send(posts);
    } catch (error) {
      console.error(error);
      
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },

  /**
   * @description Creates a post
   * @returns Post - A post.
   * @throws 500 - Fatal Error.
   */
  create: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { authUser } = req.body;
      const post: Post = await Post.create({
        ...req.body,
        userId: authUser.id,
      });

      return res.status(201).send(post);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },

  /**
   * @description Updates a post
   * @returns Post - An updated post.
   * @throws 400 - Post does not exist or does not belong to the user.
   * @throws 500 - Fatal Error.
   */
  update: async (req: Request, res: Response): Promise<Response> => {
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
        return res.status(400).send({
          status: 400,
          message:
            "Invalid Request! Post does not exist or user does not have access.",
        });
      }

      return post.update(req.body).then((p) => res.send(p));
    } catch (error) {
      console.error(error);
      
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },

  /**
   * @description Deletes a post
   * @throws 400 - Post does not exist or belong to the user.
   * @throws 500 - Fatal Error.
   */
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
        return res.status(400).send({
          status: 400,
          message:
            "Invalid Request! Post does not exist or user does not have access..",
        });
      }

      await post.destroy();

      return res.sendStatus(204);
    } catch (error) {
      console.error(error);
      
      return res
        .status(500)
        .send({ status: 500, message: "Fatal error!", error });
    }
  },
};
