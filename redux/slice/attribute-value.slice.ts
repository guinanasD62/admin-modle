import { createSlice } from "@reduxjs/toolkit";
import { createAttributeValueThunk, deleteAttributeValueThunk, fetchAttributeValueByIdThunk, attributeValueListThunk, updateAttributeValueThunk, toggleAttributeValueThunk } from "../thunk/attribute-value.thunk";


const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false
};

export const attribute_value = createSlice({
    name: "attributeValue",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        }
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(attributeValueListThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(attributeValueListThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.list = action?.payload?.data?.result || [];
            })
            .addCase(attributeValueListThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(createAttributeValueThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(createAttributeValueThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(createAttributeValueThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchAttributeValueByIdThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchAttributeValueByIdThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchAttributeValueByIdThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateAttributeValueThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(updateAttributeValueThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(updateAttributeValueThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(deleteAttributeValueThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(deleteAttributeValueThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(deleteAttributeValueThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(toggleAttributeValueThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(toggleAttributeValueThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(toggleAttributeValueThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export const { resetList } = attribute_value.actions;

export default attribute_value.reducer;