import express, { Router, Request, Response } from "express";
import { SignUp, SignIn, Session } from "../controller/auth";
import { auth } from "../middleware/auth";

const route: Router = express.Router();

route.post("/sign-in", async (req: Request, res: Response) => {
  const response = await SignIn(req.body.email, req.body.password);
  res.status(response.status).json(response.body);
});

route.post("/sign-up", async (req: Request, res: Response) => {
  const response = await SignUp(req.body.email, req.body.password);
  res.status(response.status).json(response.body);
});

route.get("/session", auth, async (req: Request, res: Response) => {
  const session = await Session(req.body.user);
  res.status(session.status).json(session.body);
});

export default route;
