import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";


//Thunk to fetch faq category for dropdown
export const fetchFaqCategoryForDropDownThunk = createAsyncThunk(
    "faq-category/fetchfordropdown",
    async () => {
        try {
            const res = await privateClient.get(`/faq-category/dropdown`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);