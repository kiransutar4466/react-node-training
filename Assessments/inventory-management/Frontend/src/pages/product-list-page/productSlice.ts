import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { productStateTypes } from "../../types/slice-state-types/productStateTypes";


const initialState : productStateTypes= {

    isLoading:false,
    error:null,
    products:null,
    details:null,
    allCategories:[],
    selectedProduct:null,
    isSuccess:false,

}
const productSlice = createSlice({
    name:"productSlice",
    initialState,

    reducers:{

        startProductApiRequest:(state)=>{
            state.isSuccess = false
            state.isLoading = true;
            state.error = null;
        },

        successFetchAllProducts:(state, action)=>{
            const  { data ,page, next,totalPages,prev} = action.payload
            state.products = data;
            state.details = {page, next,totalPages,prev};
            state.isLoading = false;
           
        },

        successFetchProductById:(state, action)=>{
            state.selectedProduct =  action.payload;
            state.isLoading = false;
         
        },

        successFetchAllCategories:(state,action)=>{
            state.allCategories = action.payload.data
            state.isLoading = false;
            state.isSuccess = true
        },

        successEditProduct:(state)=>{
            state.isLoading = false;
            toast.success("Product edited successfully")
            state.isSuccess = true
        },

        successAddProduct:(state)=>{
            state.isLoading = false;
            toast.success("Product Added successfully")
            state.isSuccess = true
        },

        successDeleteProductById :(state)=>{
             state.isLoading = false;
             toast.success("Product Deleted successfully")
             state.isSuccess = true
        },
         

        failProductApiRequest:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload

            toast.error(state.error)
        },

        deselectProduct:(state)=>{
           state.selectedProduct = null
        }
    }

})

export default productSlice.reducer;
export const {startProductApiRequest, failProductApiRequest, successFetchAllProducts, successFetchAllCategories,successFetchProductById, successAddProduct, successEditProduct, deselectProduct, successDeleteProductById}= productSlice.actions;