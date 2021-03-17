import request from "supertest";
import faker from "faker";
import jwt from "jsonwebtoken";
import sequelize from "../../src/database/connection";
import server from "../../src";
import Post, { PostAttributes } from "../../src/database/models/post.model";
import User, { UserAttributes } from "../../src/database/models/user.model";

const BASE_URL = "/posts";
const TOTAL_INITIAL_POSTS = 4;
let postAttributes: PostAttributes;
let user: User;
let token: string;

beforeEach(async () => {
  const userAttributes: UserAttributes = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  user = await User.create(userAttributes);

  const { id, name, email } = user;

  token = jwt.sign({ id, name, email }, "access_token", { expiresIn: "10m" });

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

describe("GET /posts", () => {
  test("it should return a list of posts", async (done) => {
    const promises: Post[] = [];

    for (let i = 0; i < TOTAL_INITIAL_POSTS; i++) {
      const attributes = {
        userId: user.id,
        title: faker.random.words(Math.floor(Math.random() * Math.floor(12))),
        body: faker.lorem.paragraph(),
      };

      await Post.create(attributes);
    }
  
    await Promise.all(promises);

    return request(server).get(BASE_URL).expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(TOTAL_INITIAL_POSTS);
        expect(response.body[0].User.name).toEqual(user.name); // verify user is present
        done();
      });
  });
});

describe("POST /posts", () => {
  test("it should create a post", (done) => request(server).post(BASE_URL)
    .set("Authorization", token)
    .send(postAttributes)
    .expect(201)
    .then((response) => {
      expect(response.body).toEqual(expect.objectContaining(postAttributes));
      done();
    }));
});


describe("PUT /posts", () => {
  test("it should update a post", async (done) => {
    const newTitle = "Updated title";
    const post: Post = await Post.create(postAttributes);
 
    await post.save();

    return request(server)
      .put(`${BASE_URL}/${post.id}`)
      .set("Authorization", token)
      .send({ title: newTitle })
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({ title: newTitle })
        );
        done();
      });
  });
});
 

describe("DELETE /posts/:id", () => {
  test("it should update a post", async (done) => {
    const post: Post = await Post.create(postAttributes);

    await post.save();

    return request(server)
      .delete(`${BASE_URL}/${post.id}`)
      .set("Authorization", token)
      .expect(204)
      .then(async () => {
        const p: Post | null = await Post.findByPk(post.id);

        expect(p).toBeNull();
        done();
      });
  });
});

