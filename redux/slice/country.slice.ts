import { createSlice } from "@reduxjs/toolkit";
import {
  countryListThunk,
  createCountryThunk,
  deleteCountryThunk,
  fetchCountryByIdThunk,
  fetchCountryForDropDownThunk,
  toggleCountryThunk,
  updateCountryThunk,
} from "../thunk/country.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const country = createSlice({
  name: "country",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(countryListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(countryListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(countryListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCountryByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCountryByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchCountryByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCountryForDropDownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCountryForDropDownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchCountryForDropDownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createCountryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createCountryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createCountryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateCountryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateCountryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateCountryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteCountryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteCountryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteCountryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleCountryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleCountryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleCountryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = country.actions;

export default country.reducer;
