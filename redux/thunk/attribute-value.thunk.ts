import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch attribute_value list
interface IListPayload {
    pageSize: number;
    currentPage: number;
    seachFilter: string;
    is_active: string,
    sortBy: string,
    sortColumn: string,
}

export const attributeValueListThunk = createAsyncThunk(
    "attribute_value/fetch",
    async (payload: IListPayload) => {
        try {
            const queryParams = queryString.stringify(payload);
            const res = await privateClient.get(`/attribute-value?${queryParams}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create attribute value
interface ICreateAttributeValuePayload {
    attribute_id: string
    attribute_value_name: string;
}

export const createAttributeValueThunk = createAsyncThunk(
    "attribute_value/create",
    async (payload: ICreateAttributeValuePayload) => {
        try {
            const res = await privateClient.post("/attribute-value", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch attribute value by id
interface IFetchAttributeValueByIdPayload {
    uuid: string;
}

export const fetchAttributeValueByIdThunk = createAsyncThunk(
    "attribute_value/fetchById",
    async (payload: IFetchAttributeValueByIdPayload) => {
        try {
            const res = await privateClient.get(`/attribute-value/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to update attribute value
interface IUpdateAttributeValuePayload {
    attribute_id: string
    attribute_value_name: string;
}

interface IUpdateAttributeValueParams {
    uuid: string;
    payload: IUpdateAttributeValuePayload;
}

export const updateAttributeValueThunk = createAsyncThunk(
    "attribute_value/update",
    async ({ uuid, payload }: IUpdateAttributeValueParams) => {
        try {
            const res = await privateClient.patch(`/attribute-value/${uuid}`, payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to delete attribute value
interface IDeleteAttributeValuePayload {
    uuid: string;
}

export const deleteAttributeValueThunk = createAsyncThunk(
    "attribute_value/delete",
    async (payload: IDeleteAttributeValuePayload) => {
        try {
            const res = await privateClient.delete(`/attribute-value/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

export const fetchAttributeValueDropdownThunk = createAsyncThunk(
    "attribute_value/dropdown",
    async () => {
        try {
            const res = await privateClient.get('/attribute-value/dropdown');
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to toggle Attribute thunk 
export const toggleAttributeValueThunk = createAsyncThunk(
    "product/toggle-attribute-value",
    async (payload: any) => {
        try {
            const res = await privateClient.patch(`/attribute-value/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);