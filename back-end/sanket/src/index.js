import express from "express";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes.js";
import authRoute from "./routes/authRoutes.js"

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/users",userRoutes);
app.use("/auth",authRoute);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}/api/`);
})
