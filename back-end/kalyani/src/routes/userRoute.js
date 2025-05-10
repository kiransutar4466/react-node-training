import {getUser,getUserById,putUser,patchUser,deleteUser,addUser} from '../controller/userController.js';
import verify from '../middleware/authMiddleware.js';

import express from 'express';
const route = express.Router();

// below operations will perform after login because token will generate after login and we applied verify middleware so if it will verify succesfully then and then only the controller fun will call

route.post('/users',verify,addUser) //create user route
route.get('/users',verify,getUser);     //get all users 
route.get('/users/:id',verify,getUserById); //get data by id
route.put('/users/:id',verify,putUser);  //replace whole user data (by given id)
route.patch('/users/:id',verify,patchUser);  //update user data 
route.delete('/users/:id',verify,deleteUser);   //delete user

export default route;