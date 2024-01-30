import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import * as dotenv from "dotenv";
import mongoose from "mongoose";

import authenticationRoutes from "./routes/authentication";
import userRoutes from "./routes/user";

const app = express();

dotenv.config();

// Middlewares
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(bodyParser.json());

// Routes
app.use("/api", authenticationRoutes);
app.use("/api", userRoutes);

// Making Mongodb connection
// console.log(process.env.MONGODB_URL);
const url = process.env.MONGODB_URL;
console.log(url);
mongoose.Promise = Promise;
mongoose.connect(url);
mongoose.connection.on("error", (error: Error) => console.log(error));

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
