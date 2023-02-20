import { Router } from "express";
import { getCredentials } from "../controllers/credentials-controller.js";
import { validateToken } from "../middlewares/validateToken-middleware.js";

const credentialsRouter = Router();

credentialsRouter
.all("", validateToken)
.get("/", getCredentials)
.get("/:credentialId")
.post("/")
.delete("/:credentialId");

export { credentialsRouter };
