import {createUserService, loginUserService} from '../service/authService.js'

export const createUser = (req,res)=>{
    createUserService(req.body).then((result)=>{
        res.send({"message":"data inserted succesfully",data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    })  
}

export const loginUser = (req,res)=>{
loginUserService(req.body).then((result)=>{
    res.send({"message":"User logged succesfully",data:result});
}).catch((error)=>{
    res.send({"status":'failed',"error":error});
}) 
}