import {put, takeEvery} from "redux-saga/effects"
import { FETCH_ALL_LOW_STOCKS } from "../../constants/actionTypesConstants";
import { failLowStocksApiRequest, startLowStocksApiRequest, successFetchAllLowStocks } from "./lowStocksSlice";
import { getAllLowStocksService } from "../../services/lowStockService";


export const fetchAllLowStocks = (payload:{ page: number; perPage: number; category: string})=>{
    return {type :  FETCH_ALL_LOW_STOCKS, payload}
}


function* getAllLowStocks(action:{type:string, payload:{ page: number; perPage: number; category: string;}}){

    yield put(startLowStocksApiRequest());

    const response: {data?:any, status:number, error?:string} = yield getAllLowStocksService(action.payload);


    if(response.data && response.status == 200){
         yield put(successFetchAllLowStocks(response.data))
    }else{
         yield put(failLowStocksApiRequest(response.error))
    }


}



function* watchFetchAllLowStocks(){
    yield takeEvery(FETCH_ALL_LOW_STOCKS , getAllLowStocks)
}


export {watchFetchAllLowStocks};