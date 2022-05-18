import { auth } from "../middleware/auth";
import express, { Request, Response, Router } from "express";
import {
  CreateInvoice,
  GetInvoice,
  GetAllInvoice,
} from "../controller/invoice";

const route: Router = express.Router();

route.post("/create", auth, async (req: Request, res: Response) => {
  const invoice = await CreateInvoice(req.body);
  res.status(invoice.status).json(invoice.body);
});

route.get("/all", auth, async (req: Request, res: Response) => {
  const invoice = await GetAllInvoice(req.body);
  res.status(invoice.status).json(invoice.body);
});

route.get("/:id", async (req: Request, res: Response) => {
  const invoice = await GetInvoice(req.params);
  res.status(invoice.status).json(invoice.body);
});

export default route;
