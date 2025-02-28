import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createCmsThunk, deleteCmsThunk, fetchCmsByIdThunk, toggleCmsThunk, updateCmsThunk } from "@/redux/thunk/cms.thunk";
//Function to create cms
export const createCms = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createCmsThunk(createPayload));
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

//Function to delete cms
export const deleteCms = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteCmsThunk(deletePayload));
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

//Function to fetch cms by id
export const fetchCmsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchCmsByIdThunk(fetchByIdPayload)
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

//Function to update cms
export const updateCms = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateCmsThunk({ uuid, payload: updatePayload })
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

//Function to toggle cms  
export const toggleCms = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleCmsThunk(data));
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
