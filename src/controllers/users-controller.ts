import { Request, Response } from "express";

export async function createUser(req: Request, res: Response) {
  try {

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
}