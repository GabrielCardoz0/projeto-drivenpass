import express from "express";
import cors from "cors";
import { usersRouter } from "./routers/users-router.js";
import { credentialsRouter } from "./routers/credentials-router.js";
import { networkRouter } from "./routers/network-router.js";
import { authRouter } from "./routers/authentication-router.js";

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (req, res) => res.send("OK!"))
  .use("/users", usersRouter)
  .use("/auth", authRouter)
  .use("/network", networkRouter)
  .use("/credentials", credentialsRouter)

export default app;
