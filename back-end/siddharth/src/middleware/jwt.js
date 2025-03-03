import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { users } from "../services/userServices.js";

dotenv.config();
if (!process.env.JWT_SECRET) {
  const error = new Error("JWT Secret not provided");
  error.statusCode = 400;
  error.response = { message: "JWT Secret not provided" };
  throw error;
}

export function generateToken(user) {
  try {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    });
  } catch (error) {
    console.log("Error in generateToken function:", error.message);
    throw error;
  }
}

export function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(400).send({ message: "Token not Provided" });
    }
    const token = authHeader.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = users.find(
      (user) => user.email === decoded.email.toLowerCase()
    );
    if (!user) {
      return res.status(404).send({ message: "user not found in database" });
    }
    next();
  } catch (error) {
    console.log("Error in verifyToken function:", error.message);
    res.status(error.statusCode || 400).send({ message: error.message });
  }
}
