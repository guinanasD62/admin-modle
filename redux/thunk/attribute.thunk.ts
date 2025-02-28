import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch attribute list
interface IListPayload {
    pageSize: number;
    currentPage: number;
    seachFilter: string;
}

export const attributeListThunk = createAsyncThunk(
    "attribute/fetch",
    async (payload: IListPayload) => {
        try {
            const queryParams = queryString.stringify(payload);
            const res = await privateClient.get(`/attribute?${queryParams}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create attribute
interface IAttributePayload {
    category_name: string,
    attribute_name: string,
    is_required?: string,
}

export const createAttributeThunk = createAsyncThunk(
    "attribute/create",
    async (payload: IAttributePayload) => {
        try {
            const res = await privateClient.post("/attribute", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to update attribute
interface IUpdateAttributePayload {
    category_name: string,
    attribute_name: string,
    is_required?: string,

}

interface IUpdateAttributeParams {
    uuid: string;
    payload: IUpdateAttributePayload;
}
export const updateAttributeThunk = createAsyncThunk(
    "attribute/update",
    async ({ uuid, payload }: IUpdateAttributeParams) => {
        try {
            const res = await privateClient.patch(`/attribute/${uuid}`, payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to delete attribute
interface IDeleteAttributePayload {
    uuid: string;
}

export const deleteAttributeThunk = createAsyncThunk(
    "attribute/delete",
    async (payload: IDeleteAttributePayload) => {
        try {
            const res = await privateClient.delete(`/attribute/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch attribute by id
interface IFetchAttributeByIdPayload {
    uuid: string;
}

export const fetchAttributeByIdThunk = createAsyncThunk(
    "attribute/fetchById",
    async (payload: IFetchAttributeByIdPayload) => {
        try {
            const res = await privateClient.get(`/attribute/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch attribute for dropdown
export const fetchAttributeForDropDownThunk = createAsyncThunk(
    "attribute/fetchfordropdown",
    async () => {
        try {
            const res = await privateClient.get(`/attribute/dropdown`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);


//Thunk to toggle Attribute  
export const toggleAttributeThunk = createAsyncThunk(
    "product/toggle-attribute",
    async (payload: any) => {
        try {
            const res = await privateClient.patch(`/attribute/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);
