import { createSlice } from "@reduxjs/toolkit";
import {
    fetchFaqCategoryForDropDownThunk,
} from "../thunk/faq-category.thunk";

const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false,
};

export const faqCategory = createSlice({
    name: "faqCategory",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(fetchFaqCategoryForDropDownThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchFaqCategoryForDropDownThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchFaqCategoryForDropDownThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    }

});

export const { resetList } = faqCategory.actions;

export default faqCategory.reducer;