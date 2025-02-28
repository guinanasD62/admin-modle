import { createSlice } from "@reduxjs/toolkit";
import {
  emailTemplateListThunk,
  fetchEmailTemplateByIdThunk,
  toggleEmailTemplateThunk,
  updateEmailTemplateThunk,
} from "../thunk/email-template.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const emailTemplate = createSlice({
  name: "email-template",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(emailTemplateListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(emailTemplateListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(emailTemplateListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchEmailTemplateByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchEmailTemplateByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchEmailTemplateByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateEmailTemplateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateEmailTemplateThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(updateEmailTemplateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleEmailTemplateThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        toggleEmailTemplateThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(toggleEmailTemplateThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = emailTemplate.actions;

export default emailTemplate.reducer;
