import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch state list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const stateListThunk = createAsyncThunk(
  "state/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/state?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create state
interface IStatePayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

export const createStateThunk = createAsyncThunk(
  "state/create",
  async (payload: IStatePayload) => {
    try {
      const res = await privateClient.post("/state", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update state
interface IUpdateStatePayload {
  country_name: string;
  iso_code: string;
  mobile_code: number;
  currency_code: string;
  is_active?: boolean;
}

interface IUpdateStateParams {
  uuid: string;
  payload: IUpdateStatePayload;
}
export const updateStateThunk = createAsyncThunk(
  "state/update",
  async ({ uuid, payload }: IUpdateStateParams) => {
    try {
      const res = await privateClient.patch(`/state/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete state
interface IDeleteStatePayload {
  uuid: string;
}

export const deleteStateThunk = createAsyncThunk(
  "state/delete",
  async (payload: IDeleteStatePayload) => {
    try {
      const res = await privateClient.delete(`/state/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch state by id
interface IFetchStateByIdPayload {
  uuid: string;
}

export const fetchStateByIdThunk = createAsyncThunk(
  "state/fetchById",
  async (payload: IFetchStateByIdPayload) => {
    try {
      const res = await privateClient.get(`/state/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to fetch state for dropdown
interface IFetchStateForDropDownPayload {
  uuid: string;
}

//Thunk to fetch state for dropdown
export const fetchStateDropdownThunk = createAsyncThunk(
  "country/fetchfordropdown",
  async (payload: IFetchStateByIdPayload) => {
    try {
      const res = await privateClient.get(`/state/dropdown?uuid=${payload.uuid}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle State  
export const toggleStateThunk = createAsyncThunk(
  "product/toggle-state",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/state/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
