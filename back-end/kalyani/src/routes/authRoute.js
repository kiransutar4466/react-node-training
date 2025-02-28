import {createUser,loginUser} from '../controller/authController.js';


import express from 'express';   //import express to use router
const authroute = express.Router(); //auth route created 

//auth routes
authroute.post('/register',createUser);  
authroute.post('/login',loginUser);


// for url http://localhost:8000/auth/register --> it will go in createUser function which is present in authController.js and that's why we imported that file in top
// for url http://localhost:8000/auth/login --> it will go in loginUser function which is present in authController.js and that's why we imported that file in top


export default authroute;