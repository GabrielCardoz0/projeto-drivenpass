import { Request, Response } from "express";
import userService from "../services/users-service/index.js";

export async function createUser(req: Request, res: Response) {
  try {
    await userService.createUser(req.body);

    res.status(201).send(req.body);
  } catch (error) {
    console.log(error);
  }
}