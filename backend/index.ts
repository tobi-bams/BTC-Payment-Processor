import express, { Application, Request, Response } from "express";
const { sequelize } = require("./models");

const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ msg: "Server up and running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
  console.log(`Server Running at port ${PORT}`);
});
