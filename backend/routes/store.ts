import { auth } from "../middleware/auth";
import express, { Router, Request, Response } from "express";
import { CreateStore } from "../controller/store";

const route: Router = express.Router();

route.post("/create", auth, async (req: Request, res: Response) => {
  const response = await CreateStore(req.body.user);
  res.status(response.status).json(response.body);
});

export default route;
