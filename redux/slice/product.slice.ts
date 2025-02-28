import { createSlice } from "@reduxjs/toolkit";
import { fetchProductBySlugThunk, fetchProductImagesByIdThunk, fetchProductVariantsThunk } from "../thunk/product.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchProductBySlugThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductBySlugThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(fetchProductBySlugThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(fetchProductVariantsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchProductVariantsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(fetchProductVariantsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(fetchProductImagesByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchProductImagesByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchProductImagesByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    
  },
});

export const { resetList } = product.actions;

export default product.reducer;
