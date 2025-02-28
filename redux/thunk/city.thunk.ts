import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch city list
interface IListPayload {
    pageSize: number;
    currentPage: number;
    seachFilter: string;
}

export const cityListThunk = createAsyncThunk(
    "city/fetch",
    async (payload: IListPayload) => {
        try {
            const queryParams = queryString.stringify(payload);
            const res = await privateClient.get(`/city?${queryParams}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to create city
interface ICityPayload {
    city_name: string;
    country_uuid: string,
    state_uuid: string;
    is_active?: boolean;
}

export const createCityThunk = createAsyncThunk(
    "city/create",
    async (payload: ICityPayload) => {
        try {
            const res = await privateClient.post("/city", payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to update city
interface IUpdateCityPayload {
    city_name: string;
    country_uuid: string;
    state_uuid: string;
    is_active?: boolean;
}

interface IUpdateCityParams {
    uuid: string;
    payload: IUpdateCityPayload;
}
export const updateCityThunk = createAsyncThunk(
    "city/update",
    async ({ uuid, payload }: IUpdateCityParams) => {
        try {
            const res = await privateClient.patch(`/city/${uuid}`, payload);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to delete city
interface IDeleteCityPayload {
    uuid: string;
}

export const deleteCityThunk = createAsyncThunk(
    "state/delete",
    async (payload: IDeleteCityPayload) => {
        try {
            const res = await privateClient.delete(`/city/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to fetch city by id
interface IFetchCityByIdPayload {
    uuid: string;
}

export const fetchCityByIdThunk = createAsyncThunk(
    "state/fetchById",
    async (payload: IFetchCityByIdPayload) => {
        try {
            const res = await privateClient.get(`/city/${payload}`);
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);

//Thunk to toggle city
export const toggleCityThunk = createAsyncThunk(
    "product/toggle-attribute",
    async (payload: any) => {
        try {
            const res = await privateClient.patch(`/city/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
            return res.data;
        } catch (error: any) {
            if (error?.response?.data) {
                return error?.response?.data;
            }
            return error;
        }
    }
);
