import { Request, Response } from "express";
import authService from "../services/auth-service/index.js";

export async function authController(req: Request, res: Response) {
  try {
    const token = await authService.signIn(req.body);

    res.status(200).send(token);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};