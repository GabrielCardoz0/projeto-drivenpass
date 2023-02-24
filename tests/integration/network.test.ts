import { faker } from "@faker-js/faker";
import supertest from "supertest";
import app from "../../src/app.js";
import { createNetworkByUserId } from "../factories/network-factory.js";
import { createUser } from "../factories/users-factory.js";
import { cleanDb, generateValidToken } from "../helpers.js";

const api = supertest(app);

beforeEach(async () => {
  await cleanDb();
});

// afterAll(async () =>{
//     await cleanDb();
// });

describe("POST /network", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.post("/network");
        
    expect(response.status).toBe(401);
  });
        
  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.post("/network").set("Authorization", `Bearer tokeninvalido`);
        
    expect(response.status).toBe(401);
  });

  describe("when token is valid and body invalid", () => {

    it("should respond with status 422 if no given body", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.post("/network").send().set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(422);
    });
        
    it("should respond with status 422 if body is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.post("/network").send({}).set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(422);
    });
        
  });

  describe("when token and body is valid", () => {

    it("should respond with status 409 if credential title alredy exist", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const network = await createNetworkByUserId(user.id);

        const newNetwork = {
          network: faker.name.firstName(),
          title: network.title,
          password: faker.internet.password(10)
        }
  
        const response = await api.post("/network").send(newNetwork).set("Authorization", `Bearer ${token}`);

        console.log("*****************", response.body)
          
        expect(response.status).toBe(409);
    });

    it("should respond with status 201 and network data", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);

        const network = {
          network: faker.name.firstName(),
          title: faker.name.firstName(),
          password: faker.internet.password(10)
        }
  
        const response = await api.post("/network").send(network).set("Authorization", `Bearer ${token}`);
          
        expect(response.status).toBe(201);
    });
  });
});

describe("GET /network", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.get("/network");
        
    expect(response.status).toBe(401);
  });
        
  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.get("/network").set("Authorization", `Bearer tokeninvalido`);
        
    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {
    it("should respond with status 204 if user dont have networks", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get("/network").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);
    });

    it("should respond with status 200 and networks list", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      await createNetworkByUserId(user.id);

      const response = await api.get("/network").set("Authorization", `Bearer ${token}`);

      expect(response.body).toEqual(expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          title: expect.any(String),
          network: expect.any(String),
          password: expect.any(String),
          userId: expect.any(Number)
        })
      ]));

      expect(response.status).toBe(200);
    });

  });
});

describe("GET /network/networkId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.get("/network/0");
        
    expect(response.status).toBe(401);
  });
        
  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.get("/network/0").set("Authorization", `Bearer tokeninvalido`);
        
    expect(response.status).toBe(401);
  });

  describe("when token is valid", () => {
    
    it("should respond with status 404 if wrong networkId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await api.get("/network/0").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(404);
    });

    it("should respond with status 404 if wrong userId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const user2 = await createUser();
      const network = await createNetworkByUserId(user2.id); 

      const response = await api.get(`/network/${network.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });

    it("should respond with status 200 and network data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetworkByUserId(user.id); 

      const response = await api.get(`/network/${network.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        network: expect.any(String),
        password: expect.any(String),
        userId: expect.any(Number)
      }));

    });
  });

});

describe("DELETE /network/networkId", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await api.delete("/network/0");
        
    expect(response.status).toBe(401);
  });
        
  it("should respond with status 401 if give token is not valid", async () => {
    const response = await api.delete("/network/0").set("Authorization", `Bearer tokeninvalido`);
        
    expect(response.status).toBe(401);
  });

  describe("whn token is valid", () => {
    it("should respond with status 404 if dont find network", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
  
      const response = await api.delete("/network/0").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(404);
      
    });

    it("should respond with status 404 if wrong userId", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);

      const user2 = await createUser();
      const network = await createNetworkByUserId(user2.id); 

      const response = await api.delete(`/network/${network.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
    
    it("should respond with status 204", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const network = await createNetworkByUserId(user.id); 

      const response = await api.delete(`/network/${network.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(204);

    });
  });
});
