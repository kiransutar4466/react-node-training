import {put, takeEvery} from "redux-saga/effects"
import { DELETE_PRODUCT, EDIT_PRODUCT, FETCH_ALL_CATEGORIES, FETCH_ALL_PRODUCTS, FETCH_PRODUCT_BY_ID, POST_PRODUCT } from "../../constants/actionTypesConstants"
import { failProductApiRequest, startProductApiRequest, successAddProduct, successEditProduct, successFetchAllCategories, successFetchAllProducts, successFetchProductById , successDeleteProductById} from "./productSlice"
import { deleteProductByIdService, getAllCategoryService, getAllProductsService, getProductByIdService, patchProductService, postProductService } from "../../services/productServices"
import { fetchProductsPayoadType, ProductFormInputType } from "../../types/slice-state-types/productStateTypes"

export const fetchAllProducts = (payload:fetchProductsPayoadType)=>{
    return {type:FETCH_ALL_PRODUCTS, payload}
}

export const fetchAllCategories = (payload:number)=>{
    return {type : FETCH_ALL_CATEGORIES, payload}
}

export const fetchProductById = (payload:string)=>{
    return {type:FETCH_PRODUCT_BY_ID, payload}
}

export const patchProduct = (payload:{id:string, formData:ProductFormInputType , dispatchAction?:Function})=>{
    return {type:EDIT_PRODUCT, payload}
}

export const addProduct = (payload:{formData:ProductFormInputType , dispatchAction?:Function})=>{
    return {type:POST_PRODUCT, payload}
}

export const deleteProduct = (payload:{id:string, dispatchAction:Function}) =>{
    return {type:DELETE_PRODUCT, payload}
}


function* getAllProducts(action:{type:string, payload:fetchProductsPayoadType}){

    yield put(startProductApiRequest());

    const response: {data?:any, status?:number , error?:string} = yield getAllProductsService(action.payload);
    console.log(response)
    if(response.data && response.status == 200){
         yield put(successFetchAllProducts(response.data))
    }else{
         yield put(failProductApiRequest(response))
    }

}

function* getAllCategories(action:{type:string, payload:number}){

    yield put(startProductApiRequest());

    const response: {data?:any, status:number, error?:string} = yield getAllCategoryService(action.payload);


    if(response.data && response.status == 200){
         yield put(successFetchAllCategories(response.data))
    }else{
         yield put(failProductApiRequest(response.error))
    }


}

function* getProductById(action:{type:string, payload:string}){

    yield put(startProductApiRequest());

    const response: {data?:any, status?:number , error?:string} = yield getProductByIdService(action.payload);

    if(response.data && response.status == 200){
         yield put(successFetchProductById(response.data))
    }else{
         yield put(failProductApiRequest(response))
    }


}

function* editProduct(action:{type:string, payload:{id:string, formData:ProductFormInputType , dispatchAction?:Function}}){

    yield put(startProductApiRequest());

    const response: {data?:any, error?:string} = yield patchProductService(action.payload);


    if(response.data){
         yield put(successEditProduct())
         yield action.payload.dispatchAction && action.payload.dispatchAction()
    }else{
         yield put(failProductApiRequest(response))
    }


}

function* postProduct(action:{type:string, payload:{formData:ProductFormInputType , dispatchAction?:Function}}){

    yield put(startProductApiRequest());

    const response: {data?:any, error?:string} = yield postProductService(action.payload.formData);
    
    

    if(response.data){
         yield put(successAddProduct())
         yield action.payload.dispatchAction && action.payload.dispatchAction()
    }else{
         yield put(failProductApiRequest(response))
    }


}


function* deleteProductById(action:{type:string, payload:{id:string, dispatchAction:Function}}){

    yield put(startProductApiRequest());

    const response: {data?:any, error?:string} = yield deleteProductByIdService(action.payload.id);

    if(response.data){
         yield put(successDeleteProductById())
         yield action.payload.dispatchAction()
    }else{
         yield put(failProductApiRequest(response))
    }


}


function* watchDeleteProduct(){
    yield takeEvery(DELETE_PRODUCT, deleteProductById)
}

function* watchAddProduct(){
    yield takeEvery(POST_PRODUCT , postProduct)
}

function* watchPatchProduct(){
    yield takeEvery(EDIT_PRODUCT, editProduct)
}

function* watchFetchProductById(){
    yield takeEvery(FETCH_PRODUCT_BY_ID, getProductById)
}

function* watchFetchAllCategories(){
    yield takeEvery(FETCH_ALL_CATEGORIES , getAllCategories)
}

function* watchFetchAllProducts(){
    yield takeEvery(FETCH_ALL_PRODUCTS, getAllProducts)
}

export {watchFetchAllProducts , watchFetchAllCategories, watchFetchProductById, watchPatchProduct,  watchAddProduct, watchDeleteProduct}