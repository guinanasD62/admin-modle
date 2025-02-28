import { createSlice } from "@reduxjs/toolkit";
import { createIndustryThunk, deleteIndustryThunk, fetchIndustryByIdThunk, industryListThunk, toggleIndustryThunk, updateIndustryThunk } from "../thunk/industry.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false
};

export const industry = createSlice({
  name: "industry",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(industryListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(industryListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(industryListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createIndustryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createIndustryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createIndustryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchIndustryByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchIndustryByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchIndustryByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateIndustryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateIndustryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateIndustryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteIndustryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteIndustryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteIndustryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleIndustryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleIndustryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleIndustryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = industry.actions;

export default industry.reducer;
