import {getUserService, getUserByIdService,putUserService,patchUserService,deleteUserService} from '../service/userService.js';
import {createUserService} from '../service/authService.js'

export const addUser = (req,res)=>{
    createUserService(req.body).then((result)=>{
            res.send({"message":"data inserted succesfully",data:result});
        }).catch((error)=>{
            res.send({"status":'failed',"error":error});
        })  
}

export const getUser = (req,res)=>{
    getUserService(req).then((result)=>{
        res.send({data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    }) 
}

export const getUserById = (req,res)=>{
    getUserByIdService(req.params.id).then((result)=>{
        res.send({data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    })
}

export const putUser = (req,res)=>{
    putUserService(req.params.id,req.body).then((result)=>{
        res.send({data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    })
}

export const patchUser = (req,res)=>{
    patchUserService(req.params.id,req.body).then((result)=>{
        res.send({data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    })
}

export const deleteUser = (req,res)=>{
    deleteUserService(req.params.id).then((result)=>{
        res.send({data:result});
    }).catch((error)=>{
        res.send({"status":'failed',"error":error});
    })
}