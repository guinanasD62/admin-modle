import { createSlice } from "@reduxjs/toolkit";
import {
  contactusListThunk,
  deleteContactUsThunk,
} from "../thunk/contact-us.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const contactus = createSlice({
  name: "contactus",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(contactusListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(contactusListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(contactusListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteContactUsThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteContactUsThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteContactUsThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = contactus.actions;

export default contactus.reducer;
