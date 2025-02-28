import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch social media list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string,
  sortBy: string,
  sortColumn: string,
}

export const socialMediaListThunk = createAsyncThunk(
  "social-media/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/social-media?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create social media
interface ICreateSocialMediaPayload {
  title: string;
  link: string;
}

export const createSocialMediaThunk = createAsyncThunk(
  "social-media/create",
  async (payload: ICreateSocialMediaPayload) => {
    try {
      const res = await privateClient.post("/social-media", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch social media by id
interface IFetchSocialMediaByIdPayload {
  uuid: string;
}

export const fetchSocialMediaByIdThunk = createAsyncThunk(
  "social-media/fetchById",
  async (payload: IFetchSocialMediaByIdPayload) => {
    try {
      const res = await privateClient.get(`/social-media/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update social media
interface IUpdateSocialMediaPayload {
  title: string;
  link: string;
}

interface IUpdateSocialMediaParams {
  uuid: string;
  payload: IUpdateSocialMediaPayload;
}

export const updateSocialMediaThunk = createAsyncThunk(
  "social-media/update",
  async ({ uuid, payload }: IUpdateSocialMediaParams) => {
    try {
      const res = await privateClient.patch(`/social-media/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete social media
interface IDeleteSocialMediaPayload {
  uuid: string;
}

export const deleteSocialMediaThunk = createAsyncThunk(
  "social-media/delete",
  async (payload: IDeleteSocialMediaPayload) => {
    try {
      const res = await privateClient.delete(`/social-media/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle social media  
export const toggleSocialMediaThunk = createAsyncThunk(
  "product/toggle-social-media",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/social-media/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
