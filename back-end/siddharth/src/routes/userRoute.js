import { Router } from "express";

import {
  getUsersData,
  getUserById,
  postUserData,
  putUserById,
  patchUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = Router();

// Retrieves the list of all users.
router.get("/", getUsersData);

// Fetches a single user by ID.
router.get("/:id", getUserById);

// Adds a new user to the array.
router.post("/", postUserData);

// Updates an existing user's details.
router.put("/:id", putUserById);
router.patch("/:id", patchUserById);

// Removes a user from the array.
router.delete("/:id", verifyToken, deleteUserById);

export default router;
