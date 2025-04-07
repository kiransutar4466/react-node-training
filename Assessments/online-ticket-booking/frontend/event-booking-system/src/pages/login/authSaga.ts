import { put, takeEvery } from 'redux-saga/effects'
import { LOGIN_USER, LoginActionPayload } from '../../types/types'
import { setError, setLoginSuccess, startLoading } from './authSlice'
import { authApi } from '../../services/authService'

import { toast } from 'react-toastify';

import { jwtDecode, JwtPayload } from 'jwt-decode';

export const logInUser = (payload: LoginActionPayload) => {

    return {
        type: LOGIN_USER, payload
    }
}

function* loginUser(action: { type: string; payload: LoginActionPayload }) {

    try {
        const { data, navigate } = action.payload
        yield put(startLoading())

        const { response } = yield authApi(data)

        if (response.status == 200 || response.status == 201) {
            localStorage.setItem("token", response?.data?.token)
            const decoded: JwtPayload & { role?: string } = jwtDecode(response?.data?.token);

            toast.success(response?.data?.message)
            if (decoded.role == 'admin') {
                navigate('/admin/admin-dashboard')
            } else if (decoded.role == "user") {
                navigate('/')
            }

            yield put(setLoginSuccess(response))
        }



    } catch (error: any) {
        toast.error(error)
        yield put(setError(error))
    }
}

function* wahtchLogin() {

    yield takeEvery(LOGIN_USER, loginUser)
}

export default wahtchLogin

