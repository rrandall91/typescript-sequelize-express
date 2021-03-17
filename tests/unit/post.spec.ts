import faker from "faker";
import slugify from "slugify";
import sequelize from "../../src/database/connection";
import server from "../../src";
import Post, { PostAttributes } from "../../src/database/models/post.model";
import User, { UserAttributes } from "../../src/database/models/user.model";

let postAttributes: PostAttributes;
let user: User;

beforeEach(async () => {
  const userAttributes: UserAttributes = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  user = await User.create(userAttributes);

  postAttributes = {
    userId: user.id,
    title: faker.random.words(Math.floor(Math.random() * Math.floor(12))),
    body: faker.lorem.paragraph(),
  };
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("Post model", () => {
  describe("property: slug", () => {
    test("it should slugify the title by default", async () => {
      const post = await Post.create(postAttributes);

      expect(post.slug).toEqual(slugify(post.title.toLowerCase()));
    });
  });
});
