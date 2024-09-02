import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import indexRouter from "./router/index.router";

config();

const app = express();
const PORT = 3020;
const connectionString: string =
  process.env.DB_CONNECTION_URL || "mongodb://localhost:27017";

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`);
});

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to Database.");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("", indexRouter);
