import express, { Request, Response } from "express";
import { UserRequest } from "../../interface/userInterface";
import controller from "./datasource";
import includeUser from "../../utils/auth/includeUsers";

const router = express.Router();
const Controller = new controller();

const cookieOptions: object = {
  maxAge: 2 * 60 * 60 * 1000,
  secure: true,
  httpOnly: true,
  sameSite: "lax",
};

router.post("/signup", async (req: Request, res: Response) => {
  const response: any = await Controller.createUser(req.body);

  res.send(response);
});
router.get(
  "/currentuser",
  includeUser,
  async (req: UserRequest, res: Response) => {
    if (!req.user) {
     return res.send("login to continue");
    }
    const response: any = await Controller.getCurrentUser((req as any).user);
    return res.send(response);
  }
);
router.post("/login", async (req: Request, res: Response) => {
  const { accessToken, Error }: any = await Controller.loginUser(req.body);
  if (Error) {
    return res.send(Error);
  }
  res.cookie("x-token", accessToken, cookieOptions);
  res.send("login successfull");
});

export default router;
