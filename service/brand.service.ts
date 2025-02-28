import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createBrandThunk, deleteBrandThunk, fetchBrandByIdThunk, toggleBrandThunk, updateBrandThunk } from "@/redux/thunk/brand.thunk";

//Function to create brand
export const createBrand = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createBrandThunk(createPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    store.dispatch(refreshData());
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to fetch brand by id
export const fetchBrandById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchBrandByIdThunk(fetchByIdPayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message, data: payload?.data };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to update brand
export const updateBrand = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateBrandThunk({ uuid, payload: updatePayload }));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    store.dispatch(refreshData());
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to delete brand
export const deleteBrand = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteBrandThunk(deletePayload));
    if (payload?.status !== true) {
      return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
    }
    store.dispatch(refreshData());
    return { status: payload?.status, statusCode: payload?.statusCode, message: payload?.message };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};


//Function to toggle brand
export const toggleBrands = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleBrandThunk(data));
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