import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch contact-us list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string;
  sortBy: string;
  sortColumn: string;
}

export const contactusListThunk = createAsyncThunk(
  "contact-us/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/contact-us?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete contact us
interface IDeleteContactPayload {
  uuid: string;
}

export const deleteContactUsThunk = createAsyncThunk(
  "contact-us/delete",
  async (payload: IDeleteContactPayload) => {
    try {
      const res = await privateClient.delete(`/contact-us/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
