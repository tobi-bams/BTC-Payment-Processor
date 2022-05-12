import { auth } from "../middleware/auth";
import express, { Router, Request, Response } from "express";
import { CreateBitcoinWallet } from "../controller/wallet";

const route: Router = express.Router();

route.post(
  "/create-bitcoin/:storeId",
  auth,
  async (req: Request, res: Response) => {
    const wallet = await CreateBitcoinWallet(req.body, req.params);
    res.status(wallet.status).json(wallet.body);
  }
);

export default route;
