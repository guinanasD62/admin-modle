import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch order list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const orderListThunk = createAsyncThunk(
  "order/fetchOrder",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/order/admin?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface ISellerOrderListPayload {
  id: number;
}
export const sellerOrderListThunk = createAsyncThunk(
  "order/fetch-seller-orders",
  async (payload: ISellerOrderListPayload) => {
    try {
      console.log(payload)
      const res = await privateClient.get(`/order?user_id=${payload.id}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch order details.....
export const fetchOrderDetailsThunk = createAsyncThunk(
  "order/fetch-order-details",
  async (uuid: string) => {
      try {
          const res = await privateClient.get(`/order/item/${uuid}`);
          return res.data;
      } catch (error: any) {
          if (error?.response?.data) {
              return error?.response?.data;
          }
          return error;
      }
  }
);
