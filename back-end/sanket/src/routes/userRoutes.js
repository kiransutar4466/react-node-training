import express from "express";
const userRoutes = express.Router();

import {
  getUsers,
  getById,
  patchById,
  deleteById,
  putById,
} from "../controller/userController.js";

import { verifyToken } from "../middleware/jwt.js";

userRoutes.get("/", verifyToken, getUsers);

userRoutes.get("/:id", verifyToken, getById);

userRoutes.patch("/:id", verifyToken, patchById);

userRoutes.delete("/:id", verifyToken, deleteById);

userRoutes.put("/:id", verifyToken, putById);

export default userRoutes;
