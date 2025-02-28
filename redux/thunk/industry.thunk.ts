import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch industry list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string,
  sortBy: string,
  sortColumn: string,
}

export const industryListThunk = createAsyncThunk(
  "industry/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/industry?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create industry
interface ICreateIndustryPayload {
  industry_name: string;
}

export const createIndustryThunk = createAsyncThunk(
  "industry/create",
  async (payload: ICreateIndustryPayload) => {
    try {
      const res = await privateClient.post("/industry", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch industry by id
interface IFetchIndustryByIdPayload {
  uuid: string;
}

export const fetchIndustryByIdThunk = createAsyncThunk(
  "industry/fetchById",
  async (payload: IFetchIndustryByIdPayload) => {
    try {
      const res = await privateClient.get(`/industry/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update industry
interface IUpdateIndustryPayload {
  industry_name: string;
}

interface IUpdateIndustryParams {
  uuid: string;
  payload: IUpdateIndustryPayload;
}

export const updateIndustryThunk = createAsyncThunk(
  "industry/update",
  async ({ uuid, payload }: IUpdateIndustryParams) => {
    try {
      const res = await privateClient.patch(`/industry/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete industry
interface IDeleteIndustryPayload {
  uuid: string;
}

export const deleteIndustryThunk = createAsyncThunk(
  "industry/delete",
  async (payload: IDeleteIndustryPayload) => {
    try {
      const res = await privateClient.delete(`/industry/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const fetchIndustryDropdownThunk = createAsyncThunk(
  "industry/dropdown",
  async () => {
    try {
      const res = await privateClient.get('/industry/dropdown');
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle Industry  
export const toggleIndustryThunk = createAsyncThunk(
  "product/toggle-industry",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/industry/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
