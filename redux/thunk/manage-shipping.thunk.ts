import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch shipping list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string,
  sortBy: string,
  sortColumn: string,
}

export const shippingListThunk = createAsyncThunk(
  "shipping/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/shipping?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create shipping
interface ICreateShippingPayload {
  provider_name: string;
  rates: number;
  service_area: string;
  shipping_methods: string;
  api_key: string;
}

export const createShippingThunk = createAsyncThunk(
  "shipping/create",
  async (payload: ICreateShippingPayload) => {
    try {
      const res = await privateClient.post("/shipping", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch shipping by id
interface IFetchShippingByIdPayload {
  uuid: string;
}

export const fetchShippingByIdThunk = createAsyncThunk(
  "shipping/fetchById",
  async (payload: IFetchShippingByIdPayload) => {
    try {
      
      const res = await privateClient.get(`/shipping/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update shipping
interface IUpdateShippingPayload {
  provider_name: string;
  rates: number;
  service_area: string;
  shipping_methods: string;
  api_key: string;
}

interface IUpdateShippingParams {
  uuid: string;
  payload: IUpdateShippingPayload;
}

export const updateShippingThunk = createAsyncThunk(
  "shipping/update",
  async ({ uuid, payload }: IUpdateShippingParams) => {
    try {
      const res = await privateClient.patch(`/shipping/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete shipping
interface IDeleteShippingPayload {
  uuid: string;
}

export const deleteShippingThunk = createAsyncThunk(
  "shipping/delete",
  async (payload: IDeleteShippingPayload) => {
    try {
      const res = await privateClient.delete(`/shipping/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const fetchShippingDropdownThunk = createAsyncThunk(
  "shipping/dropdown",
  async () => {
    try {
      const res = await privateClient.get('/shipping/dropdown');
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle shipping  
export const toggleShippingThunk = createAsyncThunk(
  "shipping/toggle-shipping",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/shipping/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
