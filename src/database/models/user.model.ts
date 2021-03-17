import * as Sequelize from "sequelize";
import sequelize from "../connection";

/**
 * @interface UserAttributes
 */
export interface UserAttributes {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * @type UserCreationAttributes
 */
export type UserCreationAttributes = Sequelize.Optional<UserAttributes, "id">;

/**
 * @class User
 * @extends Sequelize.Model
 * @implements UserAttributes
 * @description A class representing a user.
 */
class User
  extends Sequelize.Model
  implements UserAttributes {
  public id!: number;

  public name!: string;

  public email!: string;

  public password!: string;

  // timestamps
  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
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
    modelName: "User",
  }
);

export default User;
