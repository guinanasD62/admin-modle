import { createSlice } from "@reduxjs/toolkit";
import { categoryListThunk, createCategoryThunk, deleteCategoryThunk, fetchCategoryByIdThunk, toggleCategoryThunk, updateCategoryThunk } from "../thunk/category.thunk";


const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false
};

export const category = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    }
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(categoryListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(categoryListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(categoryListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createCategoryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createCategoryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchCategoryByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchCategoryByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchCategoryByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateCategoryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateCategoryThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateCategoryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteCategoryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteCategoryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteCategoryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleCategoryThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleCategoryThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleCategoryThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = category.actions;

export default category.reducer;
