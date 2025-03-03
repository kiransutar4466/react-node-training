import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

import { users } from "../services/userServices.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.split("Bearer ")[1];

    if (!token) {
      const error = new Error("Token not found");
      error.code = 400;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    const userAvailable = users.find(
      (item) => item.email == decodedToken.email
    );
    if (!userAvailable) {
      const error = new Error("You are not authoriserd");
      error.code = 401;
      throw error;
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(error.code || 400).send(error.message);
  }
};
