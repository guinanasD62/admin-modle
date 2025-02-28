import { store } from "@/redux/store";
import { fetchBuyerSellerCountThunk, fetchMonthWiseRevenueThunk, fetchSellerDropdownThunk, fetchSellerMonthWiseRevenueThunk, fetchBestSellerPieChartThunk, fetchCategoryDropdownThunk, fetchTrexoMonthwisePerSellerThunk } from "@/redux/thunk/dashboard.thunk";


// Function to fetch buyer and seller count for DashboardCounter
export const fetchBuyerSellerCount = async () => {
  try {
    const { payload } = await store.dispatch(fetchBuyerSellerCountThunk());
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

// Fetch Month-wise Revenue Count
export const fetchMonthWiseRevenue = async (year: string) => {
    try {
      const { payload } = await store.dispatch(fetchMonthWiseRevenueThunk(year));
      if (payload?.status !== true) {
        return {
          status: payload?.status,
          statusCode: payload?.statusCode,
          message: payload?.message,
        };
      }
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
        data: payload?.data,
      };
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Something went wrong.");
    }
  };
  // Function to fetch seller dropdown
export const fetchSellerDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchSellerDropdownThunk());
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

// Function to fetch seller month-wise revenue by year (dynamic userId)
export const fetchSellerMonthWiseRevenue = async (userId: string, year: string) => {
  try {
    const { payload } = await store.dispatch(fetchSellerMonthWiseRevenueThunk({ userId, year }));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
// Function to fetch Best Seller Pie Chart by year
export const fetchBestSellerPieChart = async (categoryId: string, year: string) => {
  try {
    const { payload } = await store.dispatch(fetchBestSellerPieChartThunk({ categoryId, year }));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
// Function to fetch category dropdown for BestSellerPieChart
export const fetchCategoryDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchCategoryDropdownThunk());
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
// Function to fetch Trexo monthwise revenue count per seller
export const fetchTrexoMonthwisePerSeller = async (userId: string, year: string) => {
  try {
    const { payload } = await store.dispatch(fetchTrexoMonthwisePerSellerThunk({ userId, year }));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
      data: payload?.data,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};