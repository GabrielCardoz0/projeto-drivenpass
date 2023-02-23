import supertest from "supertest";
import app from "../../src/app.js";
import { createUser } from "../factories/users-factory.js";
import { cleanDb, generateValidBody } from "../helpers.js";

const api = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

describe("POST /users", () => {
  it("should respond with status 422 when body in not given", async () => {
    const response = await api.post("/users");

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 if boby is invalid", async () => {
    const response = await api.post("/users").send({});

    expect(response.status).toBe(422);
  });

  describe("when body is valid",() => {
    it("should respond with status 409 if email alredy exist", async () => {
      const user = await createUser();

      const response = await api.post("/users").send(user);

      expect(response.status).toBe(409);
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
        const user = generateValidBody();

        const response = await api.post("/users").send(user);

        expect(response.status).toBe(201);
    });
  });
});