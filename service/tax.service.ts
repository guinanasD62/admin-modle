import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  createTaxThunk,
  deleteTaxThunk,
  fetchTaxByIdThunk,
  toggleTaxThunk,
  updateTaxThunk,
} from "@/redux/thunk/tax.thunk";

//Function to create tax
export const createTax = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createTaxThunk(createPayload));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    store.dispatch(refreshData());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to fetch tax by id
export const fetchTaxById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchTaxByIdThunk(fetchByIdPayload)
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

//Function to update tax
export const updateTax = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateTaxThunk({ uuid, payload: updatePayload })
    );
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    store.dispatch(refreshData());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};

//Function to delete tax
export const deleteTax = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteTaxThunk(deletePayload));
    if (payload?.status !== true) {
      return {
        status: payload?.status,
        statusCode: payload?.statusCode,
        message: payload?.message,
      };
    }
    store.dispatch(refreshData());
    return {
      status: payload?.status,
      statusCode: payload?.statusCode,
      message: payload?.message,
    };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Something went wrong.");
  }
};


//Function to toggle attributes  
export const toggleTax = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleTaxThunk(data));
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
