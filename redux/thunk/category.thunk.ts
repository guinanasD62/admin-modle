import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch category list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string,
  sortBy: string,
  sortColumn: string,
}

export const categoryListThunk = createAsyncThunk(
  "category/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/category?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to fetch category dropdown
export const fetchCategoryDropdownThunk = createAsyncThunk(
  "category/dropdown",
  async () => {
    try {
      const res = await privateClient.get('/category/dropdown');
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to create category
interface ICreateCategoryPayload {
  industry_id: string;
  category_type: string;
  imageUrl: string;
  category_name: string;
  category_description: string;
  meta_title: string;
  meta_keywords: string;
  meta_description: string;
}

export const createCategoryThunk = createAsyncThunk(
  "category/create",
  async (payload: ICreateCategoryPayload) => {
    try {
      const res = await privateClient.post("/category", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch category by id
interface IFetchCategoryByIdPayload {
  uuid: string;
}

export const fetchCategoryByIdThunk = createAsyncThunk(
  "category/fetchById",
  async (payload: IFetchCategoryByIdPayload) => {
    try {
      const res = await privateClient.get(`/category/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update category
interface IUpdateCategoryPayload {
  industry_id: string;
  category_type: string;
  imageUrl: string;
  category_name: string;
  category_description: string;
  meta_title: string;
  meta_keyword: string;
  meta_description: string;
}

interface IUpdateCategoryParams {
  uuid: string;
  payload: IUpdateCategoryPayload;
}

export const updateCategoryThunk = createAsyncThunk(
  "category/update",
  async ({ uuid, payload }: IUpdateCategoryParams) => {
    try {
      const res = await privateClient.patch(`/category/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete category
interface IDeleteCategoryPayload {
  uuid: string;
}

export const deleteCategoryThunk = createAsyncThunk(
  "category/delete",
  async (payload: IDeleteCategoryPayload) => {
    try {
      const res = await privateClient.delete(`/category/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle category  
export const toggleCategoryThunk = createAsyncThunk(
  "product/toggle-category",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/category/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);