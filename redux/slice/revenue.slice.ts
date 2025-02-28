import { createSlice } from "@reduxjs/toolkit";
import { saveRevenuePercentageThunk, fetchRevenuePercentageByUserIdThunk, updateRevenuePercentageThunk } from "../thunk/revenue.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const revenue = createSlice({
  name: "revenue",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchRevenuePercentageByUserIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchRevenuePercentageByUserIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(fetchRevenuePercentageByUserIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(saveRevenuePercentageThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        saveRevenuePercentageThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(saveRevenuePercentageThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
      builder
      .addCase(updateRevenuePercentageThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateRevenuePercentageThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(updateRevenuePercentageThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    
  },
});

export const { resetList } = revenue.actions;

export default revenue.reducer;
