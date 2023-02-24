import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function validateToken(req: Request  , res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if(!authorization) return res.sendStatus(401);
    
  const token = authorization?.replace("Bearer ", "");

  if(!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

    if(err) {
      return res.sendStatus(401);
    } else {
      res.locals.decoded = decoded;
      return next();
    };
  });
};
