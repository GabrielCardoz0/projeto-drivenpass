import { Router } from "express";
import { validateNewUserBody } from "../middlewares/validateUserSchema-middleware.js";

const usersRouter = Router();

usersRouter
  .post("/", validateNewUserBody);

export { usersRouter };
