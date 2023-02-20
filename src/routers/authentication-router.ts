import { Router } from "express";
import { authController } from "../controllers/auth-controller.js";
import { validateBody } from "../middlewares/validationSchema-middleware.js";
import { newUserSchema } from "../schemas/user-schema.js";

const authRouter = Router();

authRouter
  .post("/sign-in", validateBody(newUserSchema), authController);

  export { authRouter };
