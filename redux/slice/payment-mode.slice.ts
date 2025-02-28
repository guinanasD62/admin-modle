import { createSlice } from "@reduxjs/toolkit";
import { createPaymentModeThunk, deletePaymentModeThunk, fetchPaymentModeByIdThunk, paymentModeListThunk, togglePaymentModeThunk, updatePaymentModeThunk } from "../thunk/payment-mode.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
  pagination: {
    currentPage: 1, 
    perPage: 10, 
  },
};

export const paymentMode = createSlice({ 
  name: "paymentMode",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(paymentModeListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(paymentModeListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(paymentModeListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createPaymentModeThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createPaymentModeThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createPaymentModeThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchPaymentModeByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchPaymentModeByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchPaymentModeByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updatePaymentModeThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updatePaymentModeThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updatePaymentModeThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deletePaymentModeThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deletePaymentModeThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deletePaymentModeThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(togglePaymentModeThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(togglePaymentModeThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(togglePaymentModeThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = paymentMode.actions;

export default paymentMode.reducer;
