import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { config } from 'dotenv';
import { json } from 'express';
config();

export const users = [
    {
        "id" : "5d3bde72-82a5-4773-8d08-2f5f917ff45c",
        "firstName": "kalyani",
        "lastName" : "shelake",
        "email" : "kalyani@gmail.com",
        "password" : "$2b$10$kasJDtbKwANkHrDR9qok6O9KKhTtyfq2k08R14ncqY1m6WFq4OFly",
        "gender" :  "female"   
    }
];

export const getUserService = async(req)=>{
    try{    
        if(req.query && Object.keys(req.query).length){ 
            const [key,value] = Object.entries(req.query)[0];
            if (!['firstName', 'lastName', 'email','password','gender'].includes(key)) {
                throw new Error(`Invalid query param: ${key}`);
            }

            const dataByParam = users.find((user) => user[key] === value);
            if (dataByParam) {
                const displayUserData = JSON.parse(JSON.stringify(dataByParam));
                delete displayUserData.password;
                return displayUserData;
            } else {
                throw new Error(`No user available with ${key}: ${value}`);
            }
        }else{
            return users.map(({password,...data})=>data);
        }
     }catch(error){
         throw error.message;
     }
}

export const getUserByIdService = async(id)=>{
    try{
        const userDataById = users.find((user)=>user.id===id);

        if(!userDataById){
            throw new Error ('No user found');
        }
        // const {password,...userData} = userDataById; //delete pass
        const displayUserData = JSON.parse(JSON.stringify(userDataById));
        delete displayUserData.password;
        return displayUserData;
    }catch(error){
        throw error.message;
    }
}

export const putUserService = async(userId,data)=>{
    try{
        const userIndex = users.findIndex((user)=>user.id===userId);
        const userData = users.find((user)=>user.id===userId);

        if(!userData){
            throw new Error ('No user found');
        }

        //check if no data is provided
        if(!data || Object.keys(data).length===0){
            throw new Error(`You are trying to insert empty data, please enter some data for insert.`);
        }

        const keys = Object.keys(data);
        keys.map((key)=>{
            if(!['firstName','lastName','email','password','gender'].includes(key)){
                throw new Error(`Invalid property ${key}`)
            }
        })

        // check only if email provided - handle
        if(data.email){
            const alreadyPresentEmail = users.find((user)=>user.email===data.email);
            if(alreadyPresentEmail){
                throw new Error ('Please give another email, provided email is already exist.');
            }
        }
        
        if(data.password){ 
            data.password = bcrypt.hashSync(data.password,10); 
            const userData = {id:userId,...data};

            users.splice(userIndex,1,userData);
            const displayUserData = JSON.parse(JSON.stringify(userData));
            delete displayUserData.password;

            return displayUserData;
        }
       
        users.splice(userIndex,1,data);
        return updateData;
    }catch(error){
        throw error.message;
    }
}

export const patchUserService = async(userId,data)=>{
    try{
        const userIndex = users.findIndex((user)=>user.id===userId);
        if(userIndex === -1){
            throw new Error ('No user found');
        }

        //check if no data is provided
        if(!data || Object.keys(data).length===0){
            throw new Error(`Please provide some data for update`);
        }

        // check only if email provided - handle
        if(data.email){
            const alreadyPresentEmail = users.find((user)=>user.email===data.email);
            if(alreadyPresentEmail){
                throw new Error ('Please give another email, provided email is already exist.');
            }
        }

        if(data.password){ 
            data.password = bcrypt.hashSync(data.password,10); 
            const patchData = {...users[userIndex],...data};
            users[userIndex] = patchData;

            const displayUserData = JSON.parse(JSON.stringify(patchData));
            delete displayUserData.password;

            return displayUserData;
        }

        const keys = Object.keys(data);
        keys.map((key)=>{
            if(!['firstName','lastName','email','password','gender'].includes(key)){
                throw new Error(`Invalid property ${key}`)
            }
        })
        
        const patchData = {...users[userIndex],...data};
        users[userIndex] = patchData;
        const displayUserData = JSON.parse(JSON.stringify(patchData));
        delete displayUserData.password;

        return displayUserData;
    }catch(error){
        throw error.message;
    }
}

export const deleteUserService = async(userId)=>{
    try{
        const userIndex = users.findIndex((user) => user.id === userId);
        if(userIndex === -1){
            throw new Error ('No user found');
        }
        const data = users[userIndex];
        users.splice(userIndex, 1);
        
        const displayUserData = JSON.parse(JSON.stringify(data));
        delete displayUserData.password;
        return {'displayUserData':data};
    }catch(error){
        throw error.message;
    }
}