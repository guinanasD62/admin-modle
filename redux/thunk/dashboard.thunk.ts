import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

// Thunk to fetch buyer and seller count for DashboardCounter
export const fetchBuyerSellerCountThunk = createAsyncThunk(
  "dashboard/fetchBuyerSellerCount",
  async () => {
    try {
      const res = await privateClient.get("/dashboard/admin/buyer-seller-count");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);
//Fetch Month-wise Revenue Count
export const fetchMonthWiseRevenueThunk = createAsyncThunk(
    "dashboard/fetchMonthWiseRevenue",
    async (year: string) => {
      try {
        const res = await privateClient.get(`/dashboard/admin/monthwise-revenue-count?year=${year}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error.response.data;
        }
        return error;
      }
    }
  );
  // Thunk to fetch seller dropdown
export const fetchSellerDropdownThunk = createAsyncThunk(
  "dashboard/fetchSellerDropdown",
  async () => {
    try {
      const res = await privateClient.get("/seller/dropdown");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);

// Thunk to fetch seller month-wise revenue by year (dynamic userId)
export const fetchSellerMonthWiseRevenueThunk = createAsyncThunk(
  "dashboard/fetchSellerMonthWiseRevenue",
  async ({ userId, year }: { userId: string; year: string }) => {
    try {
      const res = await privateClient.get(
        `/dashboard/admin/seller-monthwise-revenue-count?user_id=${userId}&year=${year}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);
// Thunk to fetch Best Seller Pie Chart by year
export const fetchBestSellerPieChartThunk = createAsyncThunk(
  "dashboard/fetchBestSellerPieChart",
  async ({ categoryId, year }: { categoryId: string; year: string }) => {
    try {
      const res = await privateClient.get(
        `/dashboard/admin/best-seller-pie-chart?category_id=${categoryId}&year=${year}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);

export const fetchCategoryDropdownThunk = createAsyncThunk(
  "dashboard/fetchCategoryDropdown",
  async () => {
    try {
      const res = await privateClient.get("/category/dropdown");
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);
// Thunk to fetch Trexo monthwise revenue count per seller
export const fetchTrexoMonthwisePerSellerThunk = createAsyncThunk(
  "dashboard/fetchTrexoMonthwisePerSeller",
  async ({ userId, year }: { userId: string; year: string }) => {
    try {
      const res = await privateClient.get(
        `/dashboard/admin/trexo-monthwise-revenue-count-per-seller?user_id=${userId}&year=${year}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error.response.data;
      }
      return error;
    }
  }
);