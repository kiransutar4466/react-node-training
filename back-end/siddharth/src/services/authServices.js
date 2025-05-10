import bcrypt from "bcrypt";

import { generateToken } from "../middleware/jwt.js";
import { users, saveUserData } from "./userServices.js";

export async function loginUser(body) {
  try {
    // check if userData or body doesn't include unnecessary data
    const expectedFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "gender",
    ];
    for (let key in body) {
      if (!expectedFields.includes(key)) {
        const error = new Error("unnecessary data provided");
        error.statusCode = 400;
        error.response = { message: "unnecessary data provided" };
        throw error;
      }
    }

    // check if body includes email and password for login
    for (let i of ["email", "password"]) {
      if (!Object.keys(body).includes(i)) {
        const error = new Error("please provide email and password");
        error.statusCode = 400;
        error.response = { message: "please provide email and password" };
        throw error;
      }
    }

    // check if user email id exists or not
    const user = {
      ...users.find((user) => user.email === body.email.toLowerCase()),
    };
    if (Object.keys(user).length === 0) {
      const error = new Error("user for provided email doesn't exists");
      error.statusCode = 404;
      error.response = { message: "user for provided email doesn't exists" };
      throw error;
    }

    // check if user password is correct or not
    if (!bcrypt.compareSync(body.password, user.password)) {
      const error = new Error("invalid login credentials");
      error.statusCode = 400;
      error.response = { message: "invalid login credentials" };
      throw error;
    }

    // remove password from user obj
    delete user.password;

    // if everything is ok then generate token and return
    const token = generateToken(user);
    return {
      statusCode: 200,
      response: { token, user },
    };
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

export const registerUser = async (body) => {
  return await saveUserData(body);
};
