import { NextFunction, Request, Response } from "express";
import { newUserSchema } from "../schemas/user-schema.js";

export async function validateNewUserBody(req: Request, res: Response, next: NextFunction) {
  const { error } = newUserSchema.validate(req.body, { abortEarly: false });
  
  if(!error){
    next();
  } else {
    return res.status(422).send(error.details.map(d => d.message));
  };

};
