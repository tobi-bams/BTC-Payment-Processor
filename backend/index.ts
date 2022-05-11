import express, { Application, Request, Response } from "express";
const { sequelize } = require("./models");
import cors from "cors";
import Auth from "./routes/auth";
import Store from "./routes/store";

const app: Application = express();

app.use(cors());
app.use(express.json());
//You can use this to check if your server is working
app.get('/', (req, res) => {
  res.send("Welcome to your server")
})
app.use("/auth", Auth);
app.use("/store", Store);

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
