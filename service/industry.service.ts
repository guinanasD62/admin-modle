import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createIndustryThunk, deleteIndustryThunk, fetchIndustryByIdThunk, fetchIndustryDropdownThunk, toggleIndustryThunk, updateIndustryThunk } from "@/redux/thunk/industry.thunk";

//Function to create industry
export const createIndustry = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createIndustryThunk(createPayload));
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

//Function to fetch industry by id
export const fetchIndustryById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchIndustryByIdThunk(fetchByIdPayload));
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

//Function to update industry
export const updateIndustry = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateIndustryThunk({ uuid, payload: updatePayload }));
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

//Function to delete industry
export const deleteIndustry = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteIndustryThunk(deletePayload));
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

//Function to fetch industries for dropdown
export const fetchIndustryDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchIndustryDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};



//Function to toggle industry  
export const toggleIndustry = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleIndustryThunk(data));
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
