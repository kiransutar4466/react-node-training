import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { ordersStateTypes } from "../../types/slice-state-types/ordersStateTypes";



const initialState: ordersStateTypes= {

    isLoading:false,
    error:null,
    orders:null,
    details:null,
    selectedOrder:null,
    isSuccess:false,

}
const ordersSlice = createSlice({
    name:"ordersSlice",
    initialState,

    reducers:{

        startOrdersApiRequest:(state)=>{
            state.isSuccess = false
            state.isLoading = true;
            state.error = null;
        },

        successFetchAllOrders:(state, action)=>{
            const  { data ,page, next,totalPages,prev} = action.payload
            state.orders = data;
            state.details = {page, next,totalPages,prev};
            state.isLoading = false;
           
        },

        successFetchOrderById:(state, action)=>{
            state.selectedOrder =  action.payload;
            state.isLoading = false;
         
        },

        successEditOrder:(state)=>{
            state.isLoading = false;
            toast.success("Status updated successfully")
            state.isSuccess = true
        },

        successAddOrder:(state)=>{
            state.isLoading = false;
            toast.success("Order placed successfully")
            state.isSuccess = true
        },
         

        failOrdersApiRequest:(state,action)=>{
            state.isLoading = false;
            state.error = action.payload

            toast.error(state.error)
        },

        deselectOrder:(state)=>{
           state.selectedOrder = null
        }
    }

})

export default ordersSlice.reducer;
export const {startOrdersApiRequest, successFetchAllOrders, successFetchOrderById, successEditOrder, successAddOrder, failOrdersApiRequest, deselectOrder}=ordersSlice.actions;