import { createSlice } from "@reduxjs/toolkit";
import {
  createTestimonialThunk,
  deleteTestimonialThunk,
  fetchTestimonialByIdThunk,
  testimonialListThunk,
  toggleTestimonialThunk,
  updateTestimonialThunk,
} from "../thunk/testimonial.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const testimonial = createSlice({
  name: "testimonial",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(testimonialListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(testimonialListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(testimonialListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createTestimonialThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createTestimonialThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createTestimonialThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchTestimonialByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchTestimonialByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(fetchTestimonialByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateTestimonialThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateTestimonialThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateTestimonialThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteTestimonialThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteTestimonialThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteTestimonialThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleTestimonialThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleTestimonialThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleTestimonialThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = testimonial.actions;

export default testimonial.reducer;
