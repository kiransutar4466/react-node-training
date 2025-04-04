import {put, takeEvery} from "redux-saga/effects"
import { authPayloadType } from "../../types/slice-state-types/authStateTypes"
import { LOGIN_USER } from "../../constants/actionTypesConstants"
import { authFailure, authStart, authSuccess } from "./authSlice"
import { authService } from "../../services/authService"

export const loginUser = (payload:authPayloadType)=>{
    return {type:LOGIN_USER, payload}
}

function* authenticateUser(action:{type:string, payload:authPayloadType}){
    const {formData, navigate} = action.payload 


    yield put(authStart());

    const response:{data?:any, error?:string} = yield authService(formData);

   if(response.data){
         
     yield put(authSuccess(response.data))
     navigate("/")

   }else {
    
    yield put(authFailure(response.error))

   }

}

function* watchAuthUser(){

    yield takeEvery(LOGIN_USER, authenticateUser)
}

export default watchAuthUser;