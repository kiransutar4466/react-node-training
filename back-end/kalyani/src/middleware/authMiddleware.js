import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
config();


import { users } from '../service/userService.js';

const verify = (req,res,next)=>{
    try{
        const token = req.headers && req.headers.authorization && req.headers.authorization.split('Bearer ')[1];

        if(!token){
            throw new Error('Token not found');
        }
        
        const decodedToken = jwt.verify(token,process.env.secret_key);
        
        if(decodedToken.email){
            // for that email user preseent or not
            if(req.method==='PUT' || req.method==='PATCH' || req.method==='DELETE'){
                const userData= users.find((user)=>user.id===req.params.id);
                if(!userData){
                    throw  new Error(`No user found with ID ${req.params.id}`);
                }
            }
            next();
        }else{
            throw new Error('You are not authorized');   
        }
    }catch(error){
        console.log('error ',error.message);
        res.send({"error":error.message});
        
    }
}

export default verify;