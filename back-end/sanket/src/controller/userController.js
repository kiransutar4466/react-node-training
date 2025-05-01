import {
  getAllUsers,
  getUsersById,
  patchUsersById,
  deleteUsersById,
  putUsersById,
} from "../services/userServices.js";

export const getUsers = async (req, res) => {
  await getAllUsers(req.query)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};

export const getById = async (req, res) => {
  await getUsersById(req.params.id)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};

export const patchById = async (req, res) => {
  await patchUsersById(req.params.id, req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};

export const deleteById = async (req, res) => {
  await deleteUsersById(req.id)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};

export const putById = async (req, res) => {
  await putUsersById(req.params.id, req.body)
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.code).send(error.message);
    });
};
