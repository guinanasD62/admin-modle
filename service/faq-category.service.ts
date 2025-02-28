import { store } from "@/redux/store";

import {
    fetchFaqCategoryForDropDownThunk,
} from "@/redux/thunk/faq-category.thunk";


//Function to fetch faq category for dropdown
export const fetchFaqCategoryForDropdown = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchFaqCategoryForDropDownThunk());
        if (payload?.status !== true) {
            return {
                status: payload?.status,
                statusCode: payload?.statusCode,
                message: payload?.message,
            };
        }
        return {
            status: payload?.status,
            statusCode: payload?.statusCode,
            message: payload?.message,
            data: payload?.data,
        };
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Something went wrong.");
    }
};