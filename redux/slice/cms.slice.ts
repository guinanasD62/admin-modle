import { createSlice } from "@reduxjs/toolkit";
import {
  countryListThunk,
  createCountryThunk,
  deleteCountryThunk,
  fetchCountryByIdThunk,
  fetchCountryForDropDownThunk,
  updateCountryThunk,
} from "../thunk/country.thunk";
import {
  cmsListThunk,
  createCmsThunk,
  deleteCmsThunk,
  fetchCmsByIdThunk,
  toggleCmsThunk,
  updateCmsThunk,
} from "../thunk/cms.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const cms = createSlice({
  name: "cms",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(cmsListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(cmsListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(cmsListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCmsByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCmsByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchCmsByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createCmsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createCmsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createCmsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateCmsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateCmsThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateCmsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteCmsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteCmsThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteCmsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleCmsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleCmsThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleCmsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = cms.actions;

export default cms.reducer;
