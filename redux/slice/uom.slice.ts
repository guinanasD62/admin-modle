import { createSlice } from "@reduxjs/toolkit";
import {
    uomListThunk,
    createUomThunk,
    deleteUomThunk,
    fetchUomByIdThunk,
    fetchUomForDropDownThunk,
    updateUomThunk,
    toggleUomThunk,
} from "../thunk/uom.thunk";

const initialState = {
    isLoading: false,
    list: [],
    error: {},
    refresh: false,
};

export const uom = createSlice({
    name: "uom",
    initialState,
    reducers: {
        resetList: (state) => {
            state.list = [];
        },
    },
    extraReducers: (builder: any) => {
        builder
            .addCase(uomListThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(uomListThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.list = action?.payload?.data?.result || [];
            })
            .addCase(uomListThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchUomByIdThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchUomByIdThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchUomByIdThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(fetchUomForDropDownThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(fetchUomForDropDownThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
            })
            .addCase(fetchUomForDropDownThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(createUomThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(createUomThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(createUomThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(updateUomThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(updateUomThunk.fulfilled, (state: any, action: any) => {
                state.isLoading = false;
                state.error = action?.payload;
                state.refresh = !state.refresh;
            })
            .addCase(updateUomThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(deleteUomThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(deleteUomThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(deleteUomThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
        builder
            .addCase(toggleUomThunk.pending, (state: any) => {
                state.isLoading = true;
            })
            .addCase(toggleUomThunk.fulfilled, (state: any) => {
                state.isLoading = false;
                state.refresh = !state.refresh;
            })
            .addCase(toggleUomThunk.rejected, (state: any) => {
                state.isLoading = false;
            });
    },
});

export const { resetList } = uom.actions;

export default uom.reducer;
