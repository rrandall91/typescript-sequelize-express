import request from "supertest";
import faker from "faker";
import sequelize from "../../src/database/connection";
import server from "../../src";
import User, { UserAttributes } from "../../src/database/models/user.model";

const BASE_URL = "/users";
const TOTAL_INITIAL_USERS = 10;
let userAttributes: UserAttributes;

beforeEach(() => {
  userAttributes = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
});

afterEach(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /users", () => {
  test("it should return a list of posts", async (done) => {
    const promises: User[] = [];

    for (let i = 0; i < TOTAL_INITIAL_USERS; i++) {
      const attributes = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      await User.create(attributes);
    }
  
    await Promise.all(promises);

    return request(server).get(BASE_URL).expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(TOTAL_INITIAL_USERS);
        done();
      });
  });
});

describe("POST /users", () => {
  test("it should create a user", (done) => request(server).post(BASE_URL)
    .send(userAttributes)
    .expect(201)
    .then((response) => {
      expect(response.body).toEqual(expect.objectContaining(userAttributes));
      done();
    }));
});

describe("POST /login", () => {
  test("it should authenticate a user", async (done) => {
    const attributes = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    await User.create({ ...attributes, name: "Test User" });

    return request(server).post(`${BASE_URL}/login`)
      .send(attributes)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(expect.objectContaining({ email: attributes.email }));
        expect(response.body.token).not.toBeNull();
        done();
      });
  });
});
