import { createSlice } from "@reduxjs/toolkit";
import {
    faqListThunk,
    createFaqThunk,
    deleteFaqThunk,
    fetchFaqByIdThunk,
    fetchFaqForDropDownThunk,
    updateFaqThunk,
    toggleFaqThunk,
} from "../thunk/faq.thunk";

const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false,
};

export const faq = createSlice({
    name: "faq",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(faqListThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(faqListThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.list = action?.payload?.data?.result || [];
            })
            .addCase(faqListThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchFaqByIdThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchFaqByIdThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchFaqByIdThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchFaqForDropDownThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchFaqForDropDownThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchFaqForDropDownThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(createFaqThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(createFaqThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(createFaqThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateFaqThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(updateFaqThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(updateFaqThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(deleteFaqThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(deleteFaqThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(deleteFaqThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(toggleFaqThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(toggleFaqThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(toggleFaqThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export const { resetList } = faq.actions;

export default faq.reducer;
