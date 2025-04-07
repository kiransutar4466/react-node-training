
import { createSlice } from '@reduxjs/toolkit';

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    loading: false,
    success: false,
    error: null,
    reviewData:[],
    reviewLoading:false
  },
  reducers: {
    addReviewRequest: (state, action) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    addReviewSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    addReviewFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    startReviewLoading:(state)=>{
      state.reviewLoading=true
    },
    setReviewsData:(state,action)=>{
      state.reviewLoading=false,
      state.reviewData=action.payload
    },
    setReviewsError:(state)=>{
      state.loading=false
  
    }
  },
});

export const {
  addReviewRequest,
  addReviewSuccess,
  addReviewFailure,
  startReviewLoading,
  setReviewsData,setReviewsError
} = reviewSlice.actions;

export default reviewSlice.reducer;
