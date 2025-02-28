import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch country list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const cmsListThunk = createAsyncThunk(
  "cms/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/cms?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create cms
interface ICmsPayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

export const createCmsThunk = createAsyncThunk(
  "cms/create",
  async (payload: ICmsPayload) => {
    try {
      const res = await privateClient.post("/cms", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update cms
interface IUpdateCmsPayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

interface IUpdateCmsParams {
  uuid: string;
  payload: IUpdateCmsPayload;
}
export const updateCmsThunk = createAsyncThunk(
  "cms/update",
  async ({ uuid, payload }: IUpdateCmsParams) => {
    try {
      const res = await privateClient.patch(`/cms/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete cms
interface IDeleteCmsPayload {
  uuid: string;
}

export const deleteCmsThunk = createAsyncThunk(
  "cms/delete",
  async (payload: IDeleteCmsPayload) => {
    try {
      const res = await privateClient.delete(`/cms/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch cms by id
interface IFetchCmsByIdPayload {
  uuid: string;
}

export const fetchCmsByIdThunk = createAsyncThunk(
  "cms/fetchById",
  async (payload: IFetchCmsByIdPayload) => {
    try {
      const res = await privateClient.get(`/cms/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle cms  
export const toggleCmsThunk = createAsyncThunk(
  "product/toggle-attribute",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/cms/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
