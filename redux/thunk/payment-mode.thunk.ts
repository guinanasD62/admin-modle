import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch payment-mode list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string,
  sortBy: string,
  sortColumn: string,
}

export const paymentModeListThunk = createAsyncThunk(
  "payment-mode/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/payment-mode?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create payment-mode
interface ICreatepaymentModePayload {
  payment_methods: string;
}

export const createPaymentModeThunk = createAsyncThunk(
  "payment-mode/create",
  async (payload: ICreatepaymentModePayload) => {
    try {
      const res = await privateClient.post("/payment-mode", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch payment-mode by id
interface IFetchPaymentModeByIdPayload {
  uuid: string;
}

export const fetchPaymentModeByIdThunk = createAsyncThunk(
  "payment-mode/fetchById",
  async (payload: IFetchPaymentModeByIdPayload) => {
    try {
      const res = await privateClient.get(`/payment-mode/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update payment-mode
interface IUpdatePaymentModePayload {
    payment_methods: string;
}

interface IUpdatePaymentModeParams {
  uuid: string;
  payload: IUpdatePaymentModePayload;
}

export const updatePaymentModeThunk = createAsyncThunk(
  "payment-mode/update",
  async ({ uuid, payload }: IUpdatePaymentModeParams) => {
    try {
      const res = await privateClient.patch(`/payment-mode/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete payment-mode
interface IDeletePaymentModePayload {
  uuid: string;
}

export const deletePaymentModeThunk = createAsyncThunk(
  "payment-mode/delete",
  async (payload: IDeletePaymentModePayload) => {
    try {
      const res = await privateClient.delete(`/payment-mode/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const fetchPaymentModeDropdownThunk = createAsyncThunk(
  "payment-mode/dropdown",
  async () => {
    try {
      const res = await privateClient.get('/payment-mode/dropdown');
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle payment-mode  
export const togglePaymentModeThunk = createAsyncThunk(
  "payment-mode/toggle-payment-mode",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/payment-mode/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
