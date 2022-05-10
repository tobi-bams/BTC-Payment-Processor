import { auth } from "../middleware/auth";
import express, { Router, Request, Response } from "express";
import { CreateWallet } from "../controller/wallet";

const route: Router = express.Router();

route.post("/create", auth, async (req: Request, res: Response) => {
  const wallet = await CreateWallet(req.body.xpub);
  res.status(wallet.status).json(wallet.body);
});

export default route;
