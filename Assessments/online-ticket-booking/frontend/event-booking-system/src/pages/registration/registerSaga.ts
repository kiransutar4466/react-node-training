import { put, takeEvery } from 'redux-saga/effects'
import { REGISTER_USER, RegisterUserActionTypes } from '../../types/types'
import { registrationService } from '../../services/registrationService'

import { setLoaginSuccess, setRegisterFailed, startResisterloading } from './registerSlice';
import { toast } from 'react-toastify';

export const registerUser = (payload: any) => {
 
    return {
        type: REGISTER_USER,
        payload
    }

}

function* registerNewUser(action: { type: string, payload: RegisterUserActionTypes }) {
    try {
        yield put(startResisterloading())
        const {data,navigate}=action.payload
        const { response } = yield registrationService(data)
        if (response?.status == 201 || response?.status == 200) {

            yield put(setLoaginSuccess(response?.data))

            toast.success("User Registered Successfully")
            navigate('/login')
        }


    } catch (error:any) {
        yield put(setRegisterFailed(error))
        toast.error(error)
    }
}

function* watchRegisterUser() {
    yield takeEvery(REGISTER_USER, registerNewUser)
}

export default watchRegisterUser