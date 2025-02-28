import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to update revenue percentage.

interface IUpdateRevenuePercentagePayload {
  uuid: string;
  payload: any;
}
export const updateRevenuePercentageThunk = createAsyncThunk(
  "revenue/update",
  async ({ uuid, payload }: IUpdateRevenuePercentagePayload) => {
    try {
      const res = await privateClient.patch(`/revenue/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface ISaveRevenuePercentagePayload {
  id: number;
}
export const saveRevenuePercentageThunk = createAsyncThunk(
  "revenue/save",
  async (payload: ISaveRevenuePercentagePayload) => {
    try {
      const res = await privateClient.post(`/revenue`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch revenue percentage by user id
interface IFetchRevenuePercentageByUserIdPayload {
  uuid: string;
}

export const fetchRevenuePercentageByUserIdThunk = createAsyncThunk(
  "revenue/fetchByUserId",
  async (payload: IFetchRevenuePercentageByUserIdPayload) => {
    try {
      const res = await privateClient.get(`/revenue/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
