import { NextFunction, Request, Response } from "express";

export default async function validateToken(req: Request  , res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) return res.sendStatus(401);
    
  const token = authorization?.replace("Bearer ", "");

  if(!token) res.sendStatus(401);

  res.send({token})
};
