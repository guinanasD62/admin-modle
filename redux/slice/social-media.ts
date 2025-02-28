import { createSlice } from "@reduxjs/toolkit";
import {
  createSocialMediaThunk,
  deleteSocialMediaThunk,
  fetchSocialMediaByIdThunk,
  socialMediaListThunk,
  toggleSocialMediaThunk,
  updateSocialMediaThunk,
} from "../thunk/social-media.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const socialMedia = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(socialMediaListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(socialMediaListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(socialMediaListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createSocialMediaThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createSocialMediaThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createSocialMediaThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchSocialMediaByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSocialMediaByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
          state.error = action?.payload;
        }
      )
      .addCase(fetchSocialMediaByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateSocialMediaThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateSocialMediaThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(updateSocialMediaThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(deleteSocialMediaThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteSocialMediaThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(deleteSocialMediaThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleSocialMediaThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleSocialMediaThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleSocialMediaThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = socialMedia.actions;

export default socialMedia.reducer;
