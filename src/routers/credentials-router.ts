import { Router } from "express";
import { createCredential, getCredentials, getCredentialsByCredentialId } from "../controllers/credentials-controller.js";
import { validateToken } from "../middlewares/validateToken-middleware.js";
import { validateBody } from "../middlewares/validationSchema-middleware.js";
import { credentialSchema } from "../schemas/credentials-schema.js";

const credentialsRouter = Router();

credentialsRouter
.get("/", validateToken, getCredentials)
.get("/:credentialId", validateToken, getCredentialsByCredentialId)
.post("", validateToken, validateBody(credentialSchema),  createCredential)
.delete("/:credentialId");

export { credentialsRouter };
