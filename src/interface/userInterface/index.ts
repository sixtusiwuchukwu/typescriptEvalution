import { ObjectId } from "mongoose";
import { Request } from "express";

export interface UserRequest extends Request {
  user:any
}

export interface User {
  _id: ObjectId;
  fullName: string;
  userName: string;
  email: string;
  password: string;
  apiKey:string
  createdAt: Date;
  updatedAt: Date;
  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}
