import { Request, Response } from "express";
import networkService from "../services/network-service/index.js";

export async function createNetwork(req: Request, res: Response) {
  const { userId } = res.locals.decoded;
  try {
    const network = await networkService.createNetwork(userId, req.body);

    res.status(201).send(network);
  } catch (error) {
    console.log(error);
    res.sendStatus(409);
  };    
};