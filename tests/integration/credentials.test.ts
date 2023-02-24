import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import { createCredential } from "../factories/credentials-factory.js";
import { createUser } from "../factories/users-factory.js";
import { cleanDb, generateValidToken } from "../helpers.js";

const api = supertest(app);

beforeAll(async () => {
    await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

describe("GET /credentials", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.get("/credentials");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.get("/credentials").set("Authorization", `Bearer tokeninvalido`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if no crendetials to send", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const response = await api.get("/credentials").set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(404);
    });

    it("should respond with status 200 and with credentials data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createCredential(user.id);

      const response = await api.get("/credentials").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          url: expect.any(String),
          username: expect.any(String),
          password: expect.any(String),
          userId: expect.any(Number)
        })]);

    });
  });
});

describe("GET /credentials/credentialId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.get("/credentials/0");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.get("/credentials/0").set("Authorization", `Bearer tokeninvalido`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if no credential to send", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
    const response = await api.get("/credentials/0").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    });

    it("Should respond with status 404 if userId is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const user2 = await createUser();
      const credential = await createCredential(user2.id);

      const response = await api.get(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("respond with status 200 and credential", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const response = await api.get(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
      console.log(response.body);
      
      expect(response.status).toBe(200);

      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        url: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        userId: expect.any(Number)
      }))
    });
  });
});

describe("POST /credentials", () => {

  it("should respond with status 401 if no token is given", async () => {
    const response = await api.post("/credentials");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.post("/credentials").set("Authorization", `Bearer tokeninvalido`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid and body invalid", () => {

    it("should respond with status 422 if no given body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await api.post("/credentials").send().set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(422);
    });
        
    it("should respond with status 422 if body is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await api.post("/credentials").send({}).set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(422);
    });
        
  });

  describe("when token and body is valid", () => {
    it("should respond with status 409 if credential title alredy exist", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const newCredential = {
        title: credential.title,
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password(10)
      }

      const response = await api.post("/credentials").send(newCredential).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(409);
    });

    it("should respond with status 201 and credential data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const credential = {
        title: faker.name.firstName(),
        url: faker.internet.url(),
        username: faker.internet.userName(),
        password: faker.internet.password(10)
      }

      const response = await api.post("/credentials").send(credential).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);

      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        url: expect.any(String),
        username: expect.any(String),
        password: expect.any(String),
        userId: expect.any(Number)
      }))
    });
  });

});

describe("DELETE /credentials/credentialId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.delete("/credentials/0");

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.delete("/credentials/0").set("Authorization", `Bearer tokeninvalido`);

    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {
    it("should respond with status 404 if credentialId is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.delete("/credentials/0").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should respond with status 401 if credentialId dos not belong to you", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const user2 = await createUser();
      const credential = await createCredential(user2.id);

      const response = await api.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(401);
    });

    it("should respond with status 204", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user.id);

      const response = await api.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);

    });
  });
});



// it("should respond with status 401 if no token is given", async () => {
//   const response = await api.get("/credentials");

//   expect(response.status).toBe(401);
// });

// it("should respond with status 401 if give token is not valid", async () => {
//   const response = await api.get("/credentials").set("Authorization", `Bearer tokeninvalido`);

//   expect(response.status).toBe(401);
// });



// describe("POST /auth/sign-in", () => {
//     it("should respond with status 422 if no given body", async () => {
//       const response = await api.post("/auth/sign-in").send();
  
//       expect(response.status).toBe(422);
//     });
  
//     it("should respond with status 422 if body is invalid", async () => {
//       const response = await api.post("/auth/sign-in").send({});
  
//       expect(response.status).toBe(422);
//     });
  
//     describe("when body is valid", () => {
      
//     });
//   });