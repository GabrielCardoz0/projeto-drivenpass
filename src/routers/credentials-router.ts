import { Router } from "express";
import validateToken from "../middlewares/validateToken-middleware.js";

const credentialsRouter = Router();

credentialsRouter
.get("/", validateToken)
.get("/:credentialId")
.post("/")
.delete("/:credentialId");

export { credentialsRouter };
