import express, { Request, Response } from "express";
import includeUsers from "../../utils/auth/includeUsers";
import { UserRequest } from "../../interface/userInterface";
import Controller from "./datasource";
import { deCodeKey } from "../../tools/generateKey";

const router = express.Router();

 //localhost:8000/api/livescores/generateapikey
router.get(
  "/generateapikey",
  includeUsers,
  async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.send("login to continue");
    }
    let { Error, response } = await Controller.generateApiKey(req.user);
    if (Error) {
      return res.send(Error);
    }
    res.send(response);
  }
);

//localhost:8000/api/livescores/leagues?apikey
router.get("/leagues",includeUsers,async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.send("login to continue");
    }
    const{ apikey}:any = req.query

    let isKey:boolean = await deCodeKey(req.user,apikey)
    if(!isKey){return res.send("Authorization Failed")}
    let response:Array<object> = await Controller.getAllLeagues()

    res.send(response)
  
  })
// localhost:8000/api/livescores/countries?apikey
  router.get("/countries",includeUsers,async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.send("login to continue");
    }
    const{ apikey}:any = req.query

    let isKey:boolean = await deCodeKey(req.user,apikey)
    if(!isKey){return res.send("Authorization Failed")}
    let response:Array<object> = await Controller.getCountries()

    res.send(response)
  
  }
);

export default router;
