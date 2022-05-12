import { auth } from "../middleware/auth";
import express, { Router, Request, Response } from "express";
import {
  CreateBitcoinWallet,
  CreateLighningWallet,
} from "../controller/wallet";

const route: Router = express.Router();

route.post(
  "/create-bitcoin/:storeId",
  auth,
  async (req: Request, res: Response) => {
    const wallet = await CreateBitcoinWallet(req.body, req.params);
    res.status(wallet.status).json(wallet.body);
  }
);

route.post(
  "/create-lightning/:storeId",
  auth,
  async (req: Request, res: Response) => {
    const wallet = await CreateLighningWallet(req.body, req.params);
    res.status(wallet.status).json(wallet.body);
  }
);

export default route;
