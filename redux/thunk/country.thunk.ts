import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch country list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const countryListThunk = createAsyncThunk(
  "country/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/country?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create country
interface ICountryPayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

export const createCountryThunk = createAsyncThunk(
  "country/create",
  async (payload: ICountryPayload) => {
    try {
      const res = await privateClient.post("/country", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update country
interface IUpdateCountryPayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

interface IUpdateCountryParams {
  uuid: string;
  payload: IUpdateCountryPayload;
}
export const updateCountryThunk = createAsyncThunk(
  "country/update",
  async ({ uuid, payload }: IUpdateCountryParams) => {
    try {
      const res = await privateClient.patch(`/country/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete country
interface IDeleteCountryPayload {
  uuid: string;
}

export const deleteCountryThunk = createAsyncThunk(
  "country/delete",
  async (payload: IDeleteCountryPayload) => {
    try {
      const res = await privateClient.delete(`/country/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch country by id
interface IFetchCountryByIdPayload {
  uuid: string;
}

export const fetchCountryByIdThunk = createAsyncThunk(
  "country/fetchById",
  async (payload: IFetchCountryByIdPayload) => {
    try {
      const res = await privateClient.get(`/country/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch country for dropdown
export const fetchCountryForDropDownThunk = createAsyncThunk(
  "country/fetchfordropdown",
  async () => {
    try {
      const res = await privateClient.get(`/country/dropdown`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle country  
export const toggleCountryThunk = createAsyncThunk(
  "product/toggle-country",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/country/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
