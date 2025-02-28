import { createSlice } from "@reduxjs/toolkit";
import { createShippingThunk, deleteShippingThunk, fetchShippingByIdThunk, shippingListThunk, toggleShippingThunk, updateShippingThunk } from "../thunk/manage-shipping.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false
};

export const shipping = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(shippingListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(shippingListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(shippingListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createShippingThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createShippingThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createShippingThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchShippingByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchShippingByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchShippingByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateShippingThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateShippingThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateShippingThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteShippingThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteShippingThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteShippingThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleShippingThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleShippingThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleShippingThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = shipping.actions;

export default shipping.reducer;
