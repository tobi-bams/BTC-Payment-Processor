import { auth } from "../middleware/auth";
import express, { Request, Response, Router } from "express";
import { CreateInvoice } from "../controller/invoice";

const route: Router = express.Router();

route.post("/create", auth, async (req: Request, res: Response) => {
  const invoice = await CreateInvoice(req.body);
  res.status(invoice.status).json(invoice.body);
});

export default route;
