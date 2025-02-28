import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  createStateThunk,
  deleteStateThunk,
  fetchStateByIdThunk,
  fetchStateDropdownThunk,
  toggleStateThunk,
  updateStateThunk,
} from "@/redux/thunk/state.thunk";

//Function to create state
export const createState = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createStateThunk(createPayload));
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

//Function to update state
export const updateState = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateStateThunk({ uuid, payload: updatePayload })
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

//Function to delete state
export const deleteState = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteStateThunk(deletePayload));
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

//Function to fetch state by id
export const fetchStateById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchStateByIdThunk(fetchByIdPayload)
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


//Function to fetch state for dropdown
export const fetchStateDropdown = async (fetchDropdownStatePayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchStateDropdownThunk(fetchDropdownStatePayload));
    return payload;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to toggle state
export const toggleState = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleStateThunk(data));
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
