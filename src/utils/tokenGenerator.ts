import { User } from "../interface/userInterface";

import jwt from "jsonwebtoken";
export default async function getToken({ email, _id }: User) {
  return jwt.sign({ email, _id }, process.env.SECRETKEY,{ expiresIn: 60 * 60 });
}
