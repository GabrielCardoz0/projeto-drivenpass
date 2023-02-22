import { Router } from "express";
import { createNetwork, getNetwork, getNetworkByNetworkId } from "../controllers/network-controller.js";
import { validateToken } from "../middlewares/validateToken-middleware.js";
import { validateBody } from "../middlewares/validationSchema-middleware.js";
import { networkSchema } from "../schemas/network-schema.js";

const networkRouter = Router();

networkRouter
  .post("/", validateToken, validateBody(networkSchema), createNetwork)
  .get("/", validateToken, getNetwork)
  .get("/:networkId", validateToken, getNetworkByNetworkId);

  export { networkRouter };
