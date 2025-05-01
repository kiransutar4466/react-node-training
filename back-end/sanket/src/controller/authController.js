import { newRegister, userLogin } from "../services/authServices.js";

export const registerNewUser = async (req, res) => {
  await newRegister(req.body)
    .then((result) => {
      console.log(result);
      res.status(201).send({ message: "Register successfully", result });
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};

export const login = async (req, res) => {
  console.log("User request for login data: ", req.body);

  await userLogin(req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};
