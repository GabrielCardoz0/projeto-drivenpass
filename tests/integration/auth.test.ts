import supertest from "supertest";
import app from "../../src/app.js";
import { createUser } from "../factories/users-factory.js";
import { cleanDb, generateValidBody } from "../helpers.js";

const api = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

describe("POST /auth/sign-in", () => {
  it("should respond with status 422 if no given body", async () => {
    const response = await api.post("/auth/sign-in").send();

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 if body is invalid", async () => {
    const response = await api.post("/auth/sign-in").send({});

    expect(response.status).toBe(422);
  });

  describe("when body is valid", () => {
    it("should respond with status 400 if email is invalid", async () => {
        const user = generateValidBody();

        const response = await api.post("/auth/sign-in").send(user);

        expect(response.status).toBe(400);
    });

    it("should respond with status 400 if password is wrong", async () => {
        const user = await createUser();

        delete user.id;

        user.password = "12345678910";

        const response = await api.post("/auth/sign-in").send(user);

        expect(response.status).toBe(400);
    });

    it("should respond with status 200 and token", async () => {
        const user = await createUser();

        delete user.id;
        
        const response = await api.post("/auth/sign-in").send(user);

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            token: expect.any(String)
        });
    });
  });
});
