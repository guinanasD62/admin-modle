import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch testimonial list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
  is_active: string;
  sortBy: string;
  sortColumn: string;
}

export const testimonialListThunk = createAsyncThunk(
  "testimonial/fetch",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/testimonial?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create testimonial
interface ICreateTestimonialPayload {
  customer_name: string;
  designation: string;
  rating: string;
  review: string;
  source_name: string;
  company_name: string;
  location_city: string;
  title: string;
}

export const createTestimonialThunk = createAsyncThunk(
  "testimonial/create",
  async (payload: ICreateTestimonialPayload) => {
    try {
      const res = await privateClient.post("/testimonial", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch testimonial by id
interface IFetchTestimonialByIdPayload {
  uuid: string;
}

export const fetchTestimonialByIdThunk = createAsyncThunk(
  "testimonial/fetchById",
  async (payload: IFetchTestimonialByIdPayload) => {
    try {
      const res = await privateClient.get(`/testimonial/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update testimonial
interface IUpdateTestimonialPayload {
  customer_name: string;
  designation: string;
  rating: string;
  review: string;
  source_name: string;
  company_name: string;
  location_city: string;
  title: string;
  is_active: string;
}

interface IUpdateTestimonialParams {
  uuid: string;
  payload: IUpdateTestimonialPayload;
}

export const updateTestimonialThunk = createAsyncThunk(
  "testimonial/update",
  async ({ uuid, payload }: IUpdateTestimonialParams) => {
    try {
      const res = await privateClient.patch(`/testimonial/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete testimonial
interface IDeleteTestimonialPayload {
  uuid: string;
}

export const deleteTestimonialThunk = createAsyncThunk(
  "testimonial/delete",
  async (payload: IDeleteTestimonialPayload) => {
    try {
      const res = await privateClient.delete(`/testimonial/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to toggle testimonial  
export const toggleTestimonialThunk = createAsyncThunk(
  "product/toggle-testimonial",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(`/testimonial/toggle/visibility/${payload?.uuid}`, { is_active: payload.is_active });
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);