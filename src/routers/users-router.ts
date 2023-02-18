import { Router } from "express";
import { createUser } from "../controllers/users-controller.js";
import { validateBody } from "../middlewares/validationSchema-middleware.js";
import { newUserSchema } from "../schemas/user-schema.js";

const usersRouter = Router();

usersRouter
  .post("/", validateBody(newUserSchema), createUser);

export { usersRouter };
