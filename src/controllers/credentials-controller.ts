import { Request, Response } from "express";
import credentialsService from "../services/credentials-service/index.js";

export async function getCredentials(req: Request, res: Response) {

  const userId = res.locals.decoded.userId;

  try {
    const credentials = await credentialsService.getCredentials(userId);

    res.status(200).send(credentials)
  } catch (error) {
    console.log(error);
  }
}