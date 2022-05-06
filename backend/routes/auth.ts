import express, { Router, Request, Response } from "express";
import { SignUp, SignIn } from "../controller/auth";

const route: Router = express.Router();

route.post("/sign-in", async (req: Request, res: Response) => {
  const response = await SignIn(req.body.email, req.body.password);
  res.status(response.status).json(response.body);
});

route.post("/sign-up", async (req: Request, res: Response) => {
  const response = await SignUp(req.body.email, req.body.password);
  res.status(response.status).json(response.body);
});

export default route;
