import { createSlice } from "@reduxjs/toolkit";
import {
    attributeListThunk,
    createAttributeThunk,
    deleteAttributeThunk,
    fetchAttributeByIdThunk,
    fetchAttributeForDropDownThunk,
    toggleAttributeThunk,
    updateAttributeThunk,
} from "../thunk/attribute.thunk";

const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false,
};

export const attribute = createSlice({
    name: "attribute",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(attributeListThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(attributeListThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.list = action?.payload?.data?.result || [];
            })
            .addCase(attributeListThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchAttributeByIdThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchAttributeByIdThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchAttributeByIdThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchAttributeForDropDownThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchAttributeForDropDownThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchAttributeForDropDownThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(createAttributeThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(createAttributeThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(createAttributeThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateAttributeThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(updateAttributeThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(updateAttributeThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(deleteAttributeThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(deleteAttributeThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(deleteAttributeThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(toggleAttributeThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(toggleAttributeThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(toggleAttributeThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export const { resetList } = attribute.actions;

export default attribute.reducer;
