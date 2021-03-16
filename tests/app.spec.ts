import request from "supertest";
import server from "../src";

const BASE_URL = "/";

afterAll(async () => {
  await server.close();
});

describe("GET /", () => {
  test("it should start the server", (done) => {
    const responseData: { status: number; message: string } = {
      status: 400,
      message: "Invalid Request"
    };
    
    request(server).get(BASE_URL)
      .expect(400, responseData, done);
  });
});
