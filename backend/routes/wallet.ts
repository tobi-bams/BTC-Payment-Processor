import { auth } from "../middleware/auth";
import express, { Router, Request, Response } from "express";
import {
  CreateBitcoinWallet,
  CreateLighningWallet,
} from "../controller/wallet";
import { TestConnection } from "../utils/lightning";

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

route.get("/light", async (req: Request, res: Response) => {
  const server: any = process.env.LND_SERVER;
  const cert: any = process.env.CERT;
  const macaroon: any = process.env.MACAROON_HEX;
  console.log({ cert, macaroon });
  await TestConnection(server, cert, macaroon);
  res.status(200).json({ message: "We are good" });
});

export default route;
