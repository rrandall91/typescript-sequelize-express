import * as Sequelize from "sequelize";
import slugify from "slugify";
import sequelize from "../connection";
import User from "./user.model";

/**
 * @interface PostAttributes Interface
 */
export interface PostAttributes {
  id?: number;
  userId: number;
  title: string;
  body: string;
  slug?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * @type PostCreationAttributes
 */
export type PostCreationAttributes = Sequelize.Optional<PostAttributes, "id">;

/**
 * @class Post
 * @extends Sequelize.Model
 * @implements PostAttributes
 * @description A class representing a post.
 */
class Post
  extends Sequelize.Model
  implements PostAttributes {
  public id!: number;

  public userId!: number;

  public title!: string;

  public body!: string;

  public slug!: string;

  // timestamps
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;

  public readonly user?: User;

  public static associations: {
    user: Sequelize.Association<Post, User>;
  };
}

Post.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
      allowNull: false,
      validate: { notEmpty: true },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    body: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
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
      },
    },
  }
);

Post.belongsTo(User);

export default Post;
