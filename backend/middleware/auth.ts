import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const SECRET: any = process.env.JWT_SECRET_TOKEN;
    const token = req.headers.authorization?.split(" ")[1];
    const decodeToken = jwt.verify(token!, SECRET);
    req.body.user = decodeToken;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Request" });
  }
};
