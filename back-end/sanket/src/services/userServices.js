// import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const users = [];

export const getAllUsers = async (userQuery) => {
  try {
    const { email, gender } = userQuery;
    if (email) {
      const isuserFound = { ...users.find((item) => item.email == email) };
      delete isuserFound?.password;
      return isuserFound;
    }

    if (gender) {
      const isuserFound = users.filter((item) => item.gender == gender);
      const usersWithoutPasswords = isuserFound.map(
        ({ password, ...rest }) => rest
      );
      return usersWithoutPasswords;
    }

    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    return usersWithoutPasswords;
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};

export const getUsersById = async (userRequest) => {
  try {
    const userId = userRequest;
    const isuserFound = { ...users.find((item) => item.id == userId) };
    if (!isuserFound) {
      const error = new Error("No user found");
      error.code = 400;
      throw error;
    }
    delete isuserFound?.password;
    return isuserFound;
  } catch (error) {
    console.log(error?.message);
    throw error;
  }
};

export const patchUsersById = async (userParams, userRequestBody) => {
  try {
    const userId = userParams;
    const userBody = userRequestBody;
    if (!userBody) {
      const error = new Error("Data is empty, please provide some data");
      error.code = 400;
      throw error;
    }
    const isuserFound = users.find((item) => item.id == userId);
    if (!isuserFound) {
      const error = new Error("NO user found ");
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
    for (let key in userBody) {
      if (!expectedFields.includes(key)) {
        const error = new Error("Data is not valid to update");
        error.code = 400;
        throw error;
      }
    }

    const findForExistingUser = users.find(
      (item) => item.email == userBody.email
    );
    if (findForExistingUser && findForExistingUser.id != userId) {
      const error = new Error("Given email already exist");
      error.code = 409;
      throw error;
    }

    if (userBody.password) {
      isuserFound["password"] = bcrypt.hashSync(userBody.password, 10);
    }

    Object.assign(isuserFound, userBody);
    return { message: "Data update successfully " };
  } catch (error) {
    throw error;
  }
};

export const deleteUsersById = async (userQueryId) => {
  try {
    const userId = userQueryId;
    const userIndex = users.findIndex((item) => (item.id = userId));

    if (userIndex == -1) {
      const error = new Error("User not found ");
      error.code = 400;
      throw error;
    }

    users.splice(userIndex, 1);

    return "Data deleted successfully";
  } catch (error) {
    throw error;
  }
};

export const putUsersById = async (userParams, userData) => {
  try {
    const userId = userParams;
    const userBody = userData;
    if (!userBody) {
      const error = new Error("Data is empty for update");
      error.code = 400;
      throw error;
    }
    const isuserFound = users.find((item) => item.id == userId);
    if (!isuserFound) {
      const error = new Error("User not found");
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
    for (let key in userBody) {
      if (!expectedFields.includes(key)) {
        const error = new Error("Data is not valid to update");
        error.code = 400;
        throw error;
      }
    }
    const id = isuserFound.id;

    Object.assign(isuserFound, {
      firstName: "",
      lastName: "",
      gender: "",
    });

    const findForExistingUser = users.find(
      (item) => item.email == userBody.email
    );
    if (findForExistingUser && findForExistingUser.id != id) {
      const error = new Error("Given email is already exist");
      error.code = 409;
      throw error;
    }

    if (userBody.email) {
      isuserFound["email"] = userBody.email;
    }

    if (userBody.password) {
      isuserFound["password"] = bcrypt.hashSync(userBody.password, 10);
    }

    Object.assign(isuserFound, userBody);
    return { message: "Data update successfully " };
  } catch (error) {
    throw error;
  }
};
