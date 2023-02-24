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

export async function getNetwork(req: Request, res: Response) {
  const { userId } = res.locals.decoded;  
  try {
    const networks = await networkService.getNetworks(userId);

    res.status(200).send(networks);
  } catch (error) {
    console.log(error);
    res.sendStatus(204);
  };
};

export async function getNetworkByNetworkId(req: Request,res: Response) {
  const { userId } = res.locals.decoded;

  const networkId = Number(req.params.networkId);
  
  try {
    const network = await networkService.getNetworkByNetworkId(userId, networkId);

    res.status(200).send(network);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
}

export async function deleteNetwork(req: Request, res: Response) {
  const { userId } = res.locals.decoded;

  const { networkId } = req.params;
  try {
    await networkService.deleteNetworkByNetworkId(userId, Number(networkId));

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  };
};