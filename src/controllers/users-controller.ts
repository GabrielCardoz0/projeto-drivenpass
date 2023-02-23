import { Request, Response } from "express";
import userService from "../services/users-service/index.js";

export async function createUser(req: Request, res: Response) {
  try {
    await userService.createUser(req.body);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    
    return res.sendStatus(409);
  };
};