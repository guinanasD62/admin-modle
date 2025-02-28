import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch brand list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const brandListThunk = createAsyncThunk(
  "brand/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/brand?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create brand
interface ICreateBrandPayload {
  brand_name: string;
  brand_description: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  image_brand: string;
}

export const createBrandThunk = createAsyncThunk(
  "brand/create",
  async (payload: ICreateBrandPayload) => {
    try {
      const res = await privateClient.post("/brand", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch brand by id
interface IFetchBrandByIdPayload {
  uuid: string;
}

export const fetchBrandByIdThunk = createAsyncThunk(
  "brand/fetchById",
  async (payload: IFetchBrandByIdPayload) => {
    try {
      const res = await privateClient.get(`/brand/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update brand
interface IUpdateBrandPayload {
  brand_name: string;
  brand_description: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
  image_brand: string;
}

interface IUpdateBrandParams {
  uuid: string;
  payload: IUpdateBrandPayload;
}

export const updateBrandThunk = createAsyncThunk(
  "brand/update",
  async ({ uuid, payload }: IUpdateBrandParams) => {
    try {
      const res = await privateClient.patch(`/brand/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete brand
interface IDeleteBrandPayload {
  uuid: string;
}

export const deleteBrandThunk = createAsyncThunk(
  "brand/delete",
  async (payload: IDeleteBrandPayload) => {
    try {
      const res = await privateClient.delete(`/brand/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle brand
export const toggleBrandThunk = createAsyncThunk(
  "product/toggle-brand",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/brand/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

