import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createShippingThunk, deleteShippingThunk, fetchShippingByIdThunk, toggleShippingThunk, updateShippingThunk } from "@/redux/thunk/manage-shipping.thunk";

//Function to create shipping
export const createShipping = async (createPayload: any) => {
  try {
    
    const { payload } = await store.dispatch(createShippingThunk(createPayload));
    
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

//Function to fetch shipping by id
export const fetchShippingById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchShippingByIdThunk(fetchByIdPayload));
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

//Function to update shipping
export const updateShipping = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateShippingThunk({ uuid, payload: updatePayload }));
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

//Function to delete shipping
export const deleteShipping = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteShippingThunk(deletePayload));
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


//Function to toggle shipping
export const toggleShipping = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleShippingThunk(data));
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