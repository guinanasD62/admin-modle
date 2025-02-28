import { store } from "@/redux/store";
import {
  saveRevenuePercentageThunk,
  fetchRevenuePercentageByUserIdThunk,
  updateRevenuePercentageThunk,
} from "@/redux/thunk/revenue.thunk";

//Function to fetch revenue percentage by id
export const fetchRevenuePercentageByUserId = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchRevenuePercentageByUserIdThunk(fetchByIdPayload)
    );
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

//Function to save revenue percentage.
export const saveRevenuePercentage = async (savePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      saveRevenuePercentageThunk(savePayload)
    );
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
      data:payload?.data
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to update revenue percentage.
export const updateRevenuePercentage = async (
  uuid: string,
  updatePayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateRevenuePercentageThunk({ uuid, payload: updatePayload })
    );
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
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};
