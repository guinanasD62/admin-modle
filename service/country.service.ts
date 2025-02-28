import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  createCountryThunk,
  deleteCountryThunk,
  fetchCountryByIdThunk,
  fetchCountryForDropDownThunk,
  toggleCountryThunk,
  updateCountryThunk,
} from "@/redux/thunk/country.thunk";

//Function to create country
export const createCountry = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createCountryThunk(createPayload));
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

//Function to delete country
export const deleteCountry = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteCountryThunk(deletePayload));
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

//Function to fetch country by id
export const fetchCountryById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchCountryByIdThunk(fetchByIdPayload)
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

//Function to update country
export const updateCountry = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateCountryThunk({ uuid, payload: updatePayload })
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

//Function to fetch country for dropdown
export const fetchCountryForDropdown = async (
) => {
  try {
    const { payload } = await store.dispatch(fetchCountryForDropDownThunk());
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


//Function to toggle country  
export const toggleCountry = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleCountryThunk(data));
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
