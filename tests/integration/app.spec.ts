import request from "supertest";
import server from "../../src";
import sequelize from "../../src/database/connection";

const BASE_URL = "/";

afterAll(async () => {
  await sequelize.close();
  await server.close();
});

describe("GET /", () => {
  test("it should start the server", (done) => {
    const responseData: { status: number; message: string } = {
      status: 400,
      message: "Invalid Request"
    };
    
    return request(server).get(BASE_URL)
      .expect(400, responseData, done);
  });
});
