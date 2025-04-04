import {put, takeEvery} from "redux-saga/effects"
import { DELETE_CART_ITEM, EDIT_CART, EMPTY_CART, FETCH_CART, POST_CART } from "../../constants/actionTypesConstants"
import { failCartApiRequest, startCartApiRequest, successAddToCart, successEditCart, successFetchCart, successDeleteCartItem, successEmptyCartItem} from "./cartSlice"
import { deleteCartItemService, emptyCartService, getCartService, patchCartService, postCartItemService } from "../../services/cartServices"


export const fetchCart = (payload: {
    page: number;
    perPage: number;
  })=>{
    return {type:FETCH_CART, payload}
}


export const patchCart = (payload:{itemId:string, data:{quantity:number},  dispatchAction:Function})=>{
    return {type:EDIT_CART, payload}
}

export const addToCart = (payload:{productId:string, quantity:number, dispatchAction:Function})=>{
    return {type:POST_CART, payload}
}

export const deleteCartItem = (payload:{id:string, dispatchAction:Function}) =>{
    return {type:DELETE_CART_ITEM, payload}
}

export const emptyCart = (payload:Function)=>{
    return {type:EMPTY_CART, payload}
}

function* getCart(action:{type:string, payload:{
    page: number;
    perPage: number;
  }}){

    yield put(startCartApiRequest());

    const response: {data?:any, error?:string} = yield getCartService(action.payload);

    if(response.data){
         yield put(successFetchCart(response))
    }else{
         yield put(failCartApiRequest(response.error))
    }

}



function* editCart(action:{type:string, payload:{itemId:string, data:{quantity:number}, dispatchAction:Function}}){

    yield put(startCartApiRequest());

    const response: {data?:any, status?:number, error?:string} = yield patchCartService(action.payload);

    if(response.status === 200 || response.status === 201){
         yield put(successEditCart())
         action.payload.dispatchAction()
    }else{
         yield put(failCartApiRequest(response))
    }

  

}

function* postCart(action:{type:string, payload:{productId:string, quantity:number, dispatchAction:Function }}){

    yield put(startCartApiRequest());

    const response: {data?:any, status?:number ,error?:string} = yield postCartItemService(action.payload);
    

    if(response.status === 200 || response.status === 201){
        yield put(successAddToCart())
        action.payload.dispatchAction()
   }else{
        yield put(failCartApiRequest(response))
   }


}


function* deleteCartItemSaga(action:{type:string, payload:{id:string, dispatchAction:Function}}){

    yield put(startCartApiRequest());

    const response: {data?:any, status?:number,  error?:string} = yield deleteCartItemService(action.payload.id);

    if(response.status==200){
         yield put(successDeleteCartItem())
         yield action.payload.dispatchAction()
    }else{
         yield put(failCartApiRequest(response))
    }


}

function* emptyCartSaga(action:{type:string,payload:Function}){

    yield put(startCartApiRequest());

    const response: {data?:any, error?:string} = yield emptyCartService();

    if(response.data){
         yield put(successEmptyCartItem())
         yield action.payload()
    }else{
         yield put(failCartApiRequest(response.error))
    }

}

function* watchEmptyCart(){
    yield takeEvery(EMPTY_CART, emptyCartSaga)
}


function* watchDeleteCartItem(){
    yield takeEvery(DELETE_CART_ITEM, deleteCartItemSaga)
}

function* watchAddToCart(){
    yield takeEvery(POST_CART , postCart)
}

function* watchPatchCart(){
    yield takeEvery(EDIT_CART, editCart)
}



function* watchFetchCart(){
    yield takeEvery(FETCH_CART , getCart)
}


export {watchDeleteCartItem, watchAddToCart, watchPatchCart, watchFetchCart, watchEmptyCart}

