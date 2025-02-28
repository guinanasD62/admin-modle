import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createCityThunk, deleteCityThunk, fetchCityByIdThunk, toggleCityThunk, updateCityThunk } from "@/redux/thunk/city.thunk";

//Function to create city
export const createCity = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createCityThunk(createPayload));
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

//Function to fetch city by id
export const fetchCityById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchCityByIdThunk(fetchByIdPayload));
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

//Function to update city
export const updateCity = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateCityThunk({ uuid, payload: updatePayload }));
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

//Function to delete city
export const deleteCity = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteCityThunk(deletePayload));
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


//Function to toggle attributes  
export const toggleCity = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleCityThunk(data));
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
