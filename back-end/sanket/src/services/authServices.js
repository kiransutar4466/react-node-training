import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

import { users } from "./userServices.js";

export const newRegister = async (userBody) => {
  try {
    const isuserData = userBody;

    if (!isuserData) {
      const error = new Error("Data not found");
      error.code = 400;
      throw error;
    }

    const expectedFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "gender",
    ];
    for (let key in isuserData) {
      if (!expectedFields.includes(key)) {
        const error = new Error("Data is not valid for register");
        error.code = 400;
        throw error;
      }
    }

    if (
      !(
        isuserData.firstName &&
        isuserData.lastName &&
        isuserData.email &&
        isuserData.password &&
        isuserData.gender
      )
    ) {
      const error = new Error("Field should not empty");
      error.code = 400;
      throw error;
    }

    const userFound = users.find((item) => item.email == isuserData.email);
    if (userFound) {
      const error = new Error("Email already exists");
      error.code = 409;
      throw error;
    }
    console.log("password before encrypting:", isuserData.password);

    isuserData["password"] = bcrypt.hashSync(isuserData.password, 10);

    isuserData["id"] = uuidv4();
    users.push({ ...isuserData });

    delete isuserData?.password;
    console.log(isuserData);

    return isuserData;
  } catch (error) {
    console.log("Error in registerNewUser", error?.message);
    throw error;
  }
};

export const userLogin = async (userBody) => {
  try {
    const isuserData = userBody;

    if (!isuserData) {
      const error = new Error("Please provide email and password to login");
      error.code = 400;
      throw error;
    }
    const userFound = users.find((item) => item.email == isuserData.email);

    if (!userFound) {
      const error = new Error("Please enter correct email");
      error.code = 400;
      throw error;
    }

    if (!bcrypt.compareSync(isuserData.password, userFound.password)) {
      const error = new Error("password is incorrect");
      error.code = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: userFound.id,
        email: userFound.email,
      },
      process.env.SECRETKEY,
      {
        expiresIn: process.env.JWT_TIME,
      }
    );

    return { message: "Login Successfully", token: token };
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};
