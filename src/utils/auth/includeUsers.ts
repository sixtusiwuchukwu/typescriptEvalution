import { NextFunction, Response,Request } from "express";

import { UserRequest } from "../../interface/userInterface";
import jwt from "jsonwebtoken";

export default async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    let token: string = req && req.cookies["x-token"];
    
    if (token) {
     req.user = jwt.verify(token, process.env.SECRETKEY); 
    }
    else{
      req.user = null;
    }
  } catch (e) {
    if (e.message.includes("expired")) {
      req.user = null;
    }
  } finally {
    next();
  }
};
