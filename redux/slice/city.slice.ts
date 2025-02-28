import { createSlice } from "@reduxjs/toolkit";
import { cityListThunk, createCityThunk, deleteCityThunk, fetchCityByIdThunk, toggleCityThunk, updateCityThunk } from "../thunk/city.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const city = createSlice({
  name: "city",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(cityListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(cityListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(cityListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCityByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCityByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchCityByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createCityThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createCityThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createCityThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateCityThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateCityThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateCityThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteCityThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteCityThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteCityThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleCityThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleCityThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleCityThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = city.actions;

export default city.reducer;