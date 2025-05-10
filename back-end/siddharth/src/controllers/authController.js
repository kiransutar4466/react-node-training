import { loginUser, registerUser } from "../services/authServices.js";

export const register = async (req, res) => {
  await registerUser(req.body)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      res.status(error.statusCode || 500).send({ message: error.message });
    });
};

export const login = async (req, res) => {
  await loginUser(req.body)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      res.status(error.statusCode || 500).send({ message: error.message });
    });
};
