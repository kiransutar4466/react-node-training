import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from './userService.js';

import { config } from 'dotenv';
config();

export const createUserService =async (data)=>{
    try{
        //if user will try to insert an empty data or missing email and password
        if(!data.email || !data.password || Object.keys(data).length===0){
            throw new Error(`Either you are trying to insert empty data or you are missing email and password field which is mendatory to insert, please provide correct data`);
        }
        
        //if user will try to insert other extra property
        const keys = Object.keys(data);
        keys.map((key)=>{
            if(!['firstName','lastName','email','password','gender'].includes(key)){
                throw new Error(`Invalid property ${key}`)
            }
        })

        //if provided email is already exist
        const registeredUser = users.find((user)=>user.email===data.email);
        if(registeredUser){
            throw new Error ('Please enter another email, provided email is already exist.');
        }else{
            const uniqueId = uuidv4();
            data.password = bcrypt.hashSync(data.password,10); 
            const userData = {id:uniqueId,...data};

            users.push(userData);
            const displayUserData = JSON.parse(JSON.stringify(userData));
            delete displayUserData.password;

            return displayUserData;
        }
    }catch(error){
        throw error.message;
    }
}

export const loginUserService = async(data)=>{
    try{
        //if email or password not provided or empty data handle check
        if(!data.email || !data.password || Object.keys(data).length===0){
            throw new Error(`Please provide email and password`);
        }

       const userData= users.find((user)=>user.email===data.email);

       if(!userData){
            throw  new Error(`No user found with ${data.email}`);
       }
       const userPass = bcrypt.compareSync(data.password,userData.password);
       if(!userPass){
            throw new Error(`Wrong password`);
       }

       const token =  jwt.sign(data,process.env.secret_key,{expiresIn: process.env.EXPIRES_IN}); 
    
       const displayUserData = JSON.parse(JSON.stringify(userData));
       delete displayUserData.password;

       return {displayUserData,token};
       
    }catch(error){
        throw error.message;
    }
}