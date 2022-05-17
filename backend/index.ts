import express, { Application } from "express";
const { sequelize } = require("./models");
import cors from "cors";
import Auth from "./routes/auth";
import Store from "./routes/store";
import Wallet from "./routes/wallet";
import Invoice from "./routes/invoice";
import dotenv from "dotenv";

const app: Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());
//You can use this to check if your server is working
app.get("/", (req, res) => {
  res.send("Welcome to your server");
});
app.use("/auth", Auth);
app.use("/store", Store);
app.use("/wallet", Wallet);
app.use("/invoice", Invoice);

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
