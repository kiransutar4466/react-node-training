import express from "express";
import dotenv from "dotenv";

import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use(`/api/users`, userRoute);
app.use("/auth", authRoute);

export default app;
