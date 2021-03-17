import * as Sequelize from "sequelize";
import slugify from "slugify";
import sequelize from "../connection";

export interface PostAttributes {
  id?: number;
  title: string;
  body: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type PostCreationAttributes = Sequelize.Optional<PostAttributes, "id">;

class Post
  extends Sequelize.Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes {
  public id!: number;

  public title!: string;

  public body!: string;

  public slug!: string;

  // timestamps
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

Post.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    modelName: "Post",
    hooks: {
      beforeValidate: (post) => {
        if (!post.slug) {
          post.slug = slugify(post.title.toLowerCase());
        }
      }
    }
  }
);

export default Post;
