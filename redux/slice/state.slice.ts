import { createSlice } from "@reduxjs/toolkit";
import {
  createStateThunk,
  deleteStateThunk,
  fetchStateByIdThunk,
  fetchStateDropdownThunk,
  stateListThunk,
  toggleStateThunk,
  updateStateThunk,
} from "../thunk/state.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const state = createSlice({
  name: "state",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(stateListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(stateListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(stateListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchStateByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchStateByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchStateByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchStateDropdownThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(fetchStateDropdownThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
      })
      .addCase(fetchStateDropdownThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createStateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createStateThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createStateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateStateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateStateThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateStateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteStateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteStateThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteStateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleStateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleStateThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleStateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = state.actions;

export default state.reducer;
