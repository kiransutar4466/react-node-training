import {  put, takeLatest } from 'redux-saga/effects';
import { fetchDashboardDataStart, fetchDashboardDataSuccess, fetchDashboardDataFailure } from './dashboardSlice';
import { fetchDashboardDataApi } from '../../services/dashboardService';
import { GET_DASHBOARD_DATA } from '../../types/types';

export const getDashboardData=()=>{
    
    return{
        type:GET_DASHBOARD_DATA
    }
}
function* fetchDashboardDataSaga() {
 
  try {
    yield put(fetchDashboardDataStart())
    const {response} = yield fetchDashboardDataApi();
    yield put(fetchDashboardDataSuccess(response?.data?.data));
  } catch (error:any) {
    yield put(fetchDashboardDataFailure(error.toString()));
  }
}

export function* watchDashboardData() {
  yield takeLatest(GET_DASHBOARD_DATA, fetchDashboardDataSaga);
}
