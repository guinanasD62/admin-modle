import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch tax list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string;
  sortBy: string;
  sortColumn: string;
}

export const taxListThunk = createAsyncThunk(
  "tax/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/tax?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create tax
interface ICreateTaxPayload {
  tax_name: string;
  description: string;
  tax_type: string;
  value_type: string;
  tax_value: number;
}

export const createTaxThunk = createAsyncThunk(
  "tax/create",
  async (payload: ICreateTaxPayload) => {
    try {
      const res = await privateClient.post("/tax", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch tax by id
interface IFetchTaxByIdPayload {
  uuid: string;
}

export const fetchTaxByIdThunk = createAsyncThunk(
  "tax/fetchById",
  async (payload: IFetchTaxByIdPayload) => {
    try {
      const res = await privateClient.get(`/tax/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update tax
interface IUpdateTaxPayload {
  tax_name: string;
  description: string;
  tax_type: string;
  value_type: string;
  tax_value: number;
}

interface IUpdateTaxParams {
  uuid: string;
  payload: IUpdateTaxPayload;
}

export const updateTaxThunk = createAsyncThunk(
  "tax/update",
  async ({ uuid, payload }: IUpdateTaxParams) => {
    try {
      const res = await privateClient.patch(`/tax/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete tax
interface IDeleteTaxPayload {
  uuid: string;
}

export const deleteTaxThunk = createAsyncThunk(
  "tax/delete",
  async (payload: IDeleteTaxPayload) => {
    try {
      const res = await privateClient.delete(`/tax/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle tax  
export const toggleTaxThunk = createAsyncThunk(
  "product/toggle-tax",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/tax/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);