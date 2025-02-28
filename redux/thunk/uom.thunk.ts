import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch uom list
interface IListPayload {
    pageSize: number;
    currentPage: number;
    seachFilter: string;
}

export const uomListThunk = createAsyncThunk(
    "uom/fetch",
    async (payload: IListPayload) => {
        try {
            const queryParams = queryString.stringify(payload);
            const res = await privateClient.get(`/uom?${queryParams}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create uom
interface IUomPayload {
    category_name: string,
    uom_code: string,
    rounding_rule: string,
    rounding_value: string,
    decimal_scale: null,
    description: string,
}

export const createUomThunk = createAsyncThunk(
    "uom/create",
    async (payload: IUomPayload) => {
        try {
            const res = await privateClient.post("/uom", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to update uom
interface IUpdateUomPayload {
    category_name: string,
    uom_code: string,
    rounding_rule: string,
    rounding_value: string,
    decimal_scale: null,
    description: string,
}

interface IUpdateUomParams {
    uuid: string;
    payload: IUpdateUomPayload;
}
export const updateUomThunk = createAsyncThunk(
    "uom/update",
    async ({ uuid, payload }: IUpdateUomParams) => {
        try {
            const res = await privateClient.patch(`/uom/${uuid}`, payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to delete uom
interface IDeleteUomPayload {
    uuid: string;
}

export const deleteUomThunk = createAsyncThunk(
    "uom/delete",
    async (payload: IDeleteUomPayload) => {
        try {
            const res = await privateClient.delete(`/uom/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch uom by id
interface IFetchUomByIdPayload {
    uuid: string;
}

export const fetchUomByIdThunk = createAsyncThunk(
    "uom/fetchById",
    async (payload: IFetchUomByIdPayload) => {
        try {
            const res = await privateClient.get(`/uom/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch uom for dropdown
export const fetchUomForDropDownThunk = createAsyncThunk(
    "uom/fetchfordropdown",
    async () => {
        try {
            const res = await privateClient.get(`/uom/dropdown`);
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
export const fetchRoundingRuleThunk = createAsyncThunk(
    "uom/fetchroundrule",
    async () => {
        try {
            const res = await privateClient.get(`/uom/roundrule`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);


//Thunk to fetch rounding value
export const fetchRoundingValueThunk = createAsyncThunk(
    "uom/fetchroundvalue",
    async () => {
        try {
            const res = await privateClient.get(`/uom/roundvalue`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);


//Thunk to toggle uom  
export const toggleUomThunk = createAsyncThunk(
    "product/toggle-uom",
    async (payload: any) => {
        try {
            const res = await privateClient.patch(`/uom/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);