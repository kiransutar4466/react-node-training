import {
  getAllUsers,
  findUserById,
  saveUserData,
  updateUserById,
  updatePatchById,
  deleteUser,
} from "../services/userServices.js";

export const getUsersData = async (req, res) => {
  await getAllUsers(req.query)
    .then(({ statusCode, response }) => res.status(statusCode).send(response))
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};


export const getUserById = async (req, res) => {
  await findUserById(req.params.id)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      console.log("getUserById error:", error.message);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};


export const postUserData = async (req, res) => {
  await saveUserData(req.body)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};

export const putUserById = async (req, res) => {
  await updateUserById(req.params.id, req.body)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};

export const patchUserById = async (req, res) => {
  await updatePatchById(req.params.id, req.body)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};

export const deleteUserById = async (req, res) => {
  await deleteUser(req.params.id)
    .then(({ statusCode, response }) => {
      res.status(statusCode).send(response);
    })
    .catch((error) => {
      console.log(error.message);
      res.status(error.statusCode || 500).send({message: error.message});
    });
};
