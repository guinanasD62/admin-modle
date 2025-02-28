import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch faq list
interface IListPayload {
    pageSize: number;
    currentPage: number;
    seachFilter: string;
}

export const faqListThunk = createAsyncThunk(
    "faq/fetch",
    async (payload: IListPayload) => {
        try {
            const queryParams = queryString.stringify(payload);
            const res = await privateClient.get(`/faq?${queryParams}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create faq
interface IFaqPayload {
    faq_type: string,
    faq_category_id: string,
    question: string,
    answer: string,

}

export const createFaqThunk = createAsyncThunk(
    "faq/create",
    async (payload: IFaqPayload) => {
        try {
            const res = await privateClient.post("/faq", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to update faq
interface IUpdateFaqPayload {
    faq_type: string,
    faq_category_id: string,
    question: string,
    answer: string,
}

interface IUpdateFaqParams {
    uuid: string;
    payload: IUpdateFaqPayload;
}
export const updateFaqThunk = createAsyncThunk(
    "faq/update",
    async ({ uuid, payload }: IUpdateFaqParams) => {
        try {
            const res = await privateClient.patch(`/faq/${uuid}`, payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to delete faq
interface IDeleteFaqPayload {
    uuid: string;
}

export const deleteFaqThunk = createAsyncThunk(
    "faq/delete",
    async (payload: IDeleteFaqPayload) => {
        try {
            const res = await privateClient.delete(`/faq/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch faq by id
interface IFetchFaqByIdPayload {
    uuid: string;
}

export const fetchFaqByIdThunk = createAsyncThunk(
    "faq/fetchById",
    async (payload: IFetchFaqByIdPayload) => {
        try {
            const res = await privateClient.get(`/faq/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch faq for dropdown
export const fetchFaqForDropDownThunk = createAsyncThunk(
    "faq/fetchfordropdown",
    async () => {
        try {
            const res = await privateClient.get(`/faq/dropdown`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch rounding rule
export const fetchFaqTypesThunk = createAsyncThunk(
    "faq/fetchfaqtype",
    async () => {
        try {
            const res = await privateClient.get(`/faq/faqtypes`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);


//Thunk to toggle faq  
export const toggleFaqThunk = createAsyncThunk(
    "product/toggle-faq",
    async (payload: any) => {
        try {
            const res = await privateClient.patch(`/faq/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

