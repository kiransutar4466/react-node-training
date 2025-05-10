import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export const users = [];

export async function getAllUsers(query) {
  try {
    if (Object.keys(query).includes("gender")) {
      const newUsers = users
        .filter((user) => user.gender === query.gender)
        .map(({ ...user }) => {
          delete user.password;
          return user;
        });
      return {
        statusCode: 200,
        response: { users: newUsers },
      };
    }
    const newUsers = users.map(({ ...user }) => {
      delete user.password;
      return user;
    });
    return {
      statusCode: 200,
      response: { users: newUsers },
    };
  } catch (error) {
    console.log("Error in getAllUsers function:", error.message);
    throw error;
  }
}

export async function findUserById(userId) {
  try {
    const user = users.find((user) => user.id === userId);
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      error.response = { message: "User not found" };
      throw error;
    }

    delete user.password;

    const userCopy = { ...user };
    return {
      statusCode: 200,
      response: { user: userCopy },
    };
  } catch (error) {
    console.log("Error in findUserById function:", error.message);
    throw error;
  }
}

export async function saveUserData(userData) {
  try {
    // check if userData or body doesn't include unnecessary data
    const expectedFields = [
      "email",
      "password",
      "firstName",
      "lastName",
      "gender",
    ];
    for (let key in userData) {
      if (!expectedFields.includes(key)) {
        const error = new Error("unnecessary data provided");
        error.statusCode = 400;
        error.response = { message: "unnecessary data provided" };
        throw error;
      }
    }

    // check if userData includes email and password
    for (let i of ["email", "password"]) {
      if (!Object.keys(userData).includes(i)) {
        const error = new Error("please provide email and password");
        error.statusCode = 400;
        error.response = { message: "please provide email and password" };
        throw error;
      }
    }

    // check if user email id exists in array/database
    const user = {
      ...users.find((user) => user.email === userData.email.toLowerCase()),
    };
    if (Object.keys(user).length > 0) {
      const error = new Error("user already exists");
      error.statusCode = 409;
      error.response = { message: "user already exists" };
      throw error;
    }

    // if everything is OK then hash the password and create user
    userData["id"] = uuidv4();
    userData["email"] = userData["email"].toLowerCase();
    userData["password"] = bcrypt.hashSync(userData["password"], 10);
    users.push({ ...userData });
    delete userData.password;

    return {
      statusCode: 201,
      response: { message: "user created successfully", userData },
    };
  } catch (error) {
    console.log("Error in saveUserData function:", error.message);
    throw error;
  }
}

export async function updateUserById(id, body) {
  try {
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

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      const error = new Error("user not found");
      error.statusCode = 404;
      error.response = { message: "user not found" };
      throw error;
    }

    // check if this update is not having other users email id
    if (Object.keys(body).includes("email")) {
      const user = users.find((user) => {
        user.email === body.email.toLowerCase() && user.id !== id;
      });
      if (user) {
        const error = new Error("email id already exists");
        error.statusCode = 409;
        error.response = { message: "email id already exists" };
        throw error;
      }
    }

    // check if password is provided for updation
    if (Object.keys(body).includes("password")) {
      const hashedPassoword = bcrypt.hashSync(body["password"], 10);
      users[userIndex] = {
        id: id,
        email: users[userIndex].email,
        ...body,
        password: hashedPassoword,
      };
    }

    users[userIndex] = {
      id: id,
      email: users[userIndex].email,
      password: users[userIndex].password,
      ...body,
    };
    return {
      statusCode: 200,
      response: { message: "user updated successfully!" },
    };
  } catch (error) {
    console.log("Error in updateUserById function:", error.message);
    throw error;
  }
}

export async function updatePatchById(id, body) {
  try {
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

    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      const error = new Error("user not found");
      error.statusCode = 404;
      error.response = { message: "user not found" };
      throw error;
    }

    // check if this update is not having other users email id
    if (Object.keys(body).includes("email")) {
      users.map((user) => {
        if (user.email === body.email.toLowerCase() && user.id !== id) {
          const error = new Error("email id already exists");
          error.statusCode = 409;
          error.response = { message: "email id already exists" };
          throw error;
        }
      });
    }

    if (Object.keys(body).includes("password")) {
      const hashedPassoword = bcrypt.hashSync(body["password"], 10);
      users[userIndex] = {
        ...users[userIndex],
        ...body,
        password: hashedPassoword,
      };
      return {
        statusCode: 200,
        response: { message: "user updated successfully!" },
      };
    }

    users[userIndex] = { ...users[userIndex], ...body };
    return {
      statusCode: 200,
      response: { message: "user updated successfully!" },
    };
  } catch (error) {
    console.log("Error in updatePatchById function:", error.message);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const findUserIndex = users.findIndex((user) => user.id === id);
    if (findUserIndex === -1) {
      const error = new Error("user not found");
      error.statusCode = 404;
      error.response = { message: "user not found" };
      throw error;
    }
    users.splice(findUserIndex, 1);
    return {
      statusCode: 200,
      response: { message: "user deleted successfully" },
    };
  } catch (error) {
    console.log("Error in deleteUser function:", error.message);
    throw error;
  }
}
