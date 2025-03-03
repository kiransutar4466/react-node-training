import express from "express";
const authRoute = express.Router();

import { registerNewUser, login } from "../controller/authController.js";

authRoute.post("/register", registerNewUser);
authRoute.post("/login", login);

export default authRoute;
