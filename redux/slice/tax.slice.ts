import { createSlice } from "@reduxjs/toolkit";
import {
  createTaxThunk,
  deleteTaxThunk,
  fetchTaxByIdThunk,
  taxListThunk,
  toggleTaxThunk,
  updateTaxThunk,
} from "../thunk/tax.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const tax = createSlice({
  name: "tax",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(taxListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(taxListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(taxListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createTaxThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createTaxThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createTaxThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchTaxByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchTaxByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchTaxByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateTaxThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateTaxThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateTaxThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteTaxThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteTaxThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteTaxThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleTaxThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleTaxThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleTaxThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = tax.actions;

export default tax.reducer;
