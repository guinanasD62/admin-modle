import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBuyerSellerCountThunk,
  fetchMonthWiseRevenueThunk,
  fetchSellerDropdownThunk,
  fetchSellerMonthWiseRevenueThunk,
  fetchBestSellerPieChartThunk,
  fetchCategoryDropdownThunk,
  fetchTrexoMonthwisePerSellerThunk,
} from "../thunk/dashboard.thunk";

const initialState = {
  isLoading: false,
  error: {},
};

export const dashboard = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchBuyerSellerCountThunk
      .addCase(fetchBuyerSellerCountThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchBuyerSellerCountThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBuyerSellerCountThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message:
            action.error.message || "Failed to fetch buyer and seller count",
        };
      })

      // fetchMonthWiseRevenueThunk
      .addCase(fetchMonthWiseRevenueThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchMonthWiseRevenueThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchMonthWiseRevenueThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message:
            action.error.message || "Failed to fetch month-wise revenue data",
        };
      })

      // fetchSellerDropdownThunk
      .addCase(fetchSellerDropdownThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchSellerDropdownThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSellerDropdownThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message || "Failed to fetch seller dropdown",
        };
      })

      // fetchSellerMonthWiseRevenueThunk
      .addCase(fetchSellerMonthWiseRevenueThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchSellerMonthWiseRevenueThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchSellerMonthWiseRevenueThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message:
            action.error.message || "Failed to fetch seller month-wise revenue",
        };
      })

      // fetchBestSellerPieChartThunk
      .addCase(fetchBestSellerPieChartThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchBestSellerPieChartThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchBestSellerPieChartThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message:
            action.error.message ||
            "Failed to fetch best seller pie chart data",
        };
      })

      // fetchCategoryDropdownThunk
      .addCase(fetchCategoryDropdownThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchCategoryDropdownThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCategoryDropdownThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message: action.error.message || "Failed to fetch category dropdown",
        };
      })
      // fetchTrexoRevenuePerSellerThunk
      .addCase(fetchTrexoMonthwisePerSellerThunk.pending, (state) => {
        state.isLoading = true;
        state.error = {};
      })
      .addCase(fetchTrexoMonthwisePerSellerThunk.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchTrexoMonthwisePerSellerThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = {
          message:
            action.error.message || "Failed to fetch month-wise revenue data",
        };
      })
  },
});

export default dashboard.reducer;
