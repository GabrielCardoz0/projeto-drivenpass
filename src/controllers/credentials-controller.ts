import { Request, Response } from "express";
import credentialsService from "../services/credentials-service/index.js";

export async function getCredentials(req: Request, res: Response) {

  const userId = res.locals.decoded.userId;

  try {
    const credentials = await credentialsService.getCredentials(userId);

    res.status(200).send(credentials)
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  };
};

export async function getCredentialsByCredentialId(req: Request, res: Response) {

  const userId = res.locals.decoded;

  const {credentialId} = req.params;

  try {
    const credential = await credentialsService.getCredentialsByCredentialId(userId, Number(credentialId));

    res.status(200).send(credential)
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  };
};

export async function createCredential(req: Request, res: Response) {
  const userId = res.locals.decoded.userId;

  try {
    const newCredential = await credentialsService.createCredential(userId, req.body);

    res.status(201).send(newCredential);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}