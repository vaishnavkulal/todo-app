import "dotenv/config";
import express from "express";
import todoRouter from "../routes/todoRoutes.js";
import userRouter from "../routes/userRoutes.js";
import connectDB from "./connectDB.js";
import cors from "cors";

const DEFAULT_PORT = 3000;
const parsedPort = parseInt(process.env.PORT ?? "", 10);
const PORT = Number.isNaN(parsedPort) ? DEFAULT_PORT : parsedPort;

const app = express();
app.use(express.json());
app.use(cors())

connectDB();
app.use("/user", userRouter);
app.use("/todos", todoRouter);

app.listen(PORT, () => {
  console.log(`Server is live at PORT ${PORT}`);
});
