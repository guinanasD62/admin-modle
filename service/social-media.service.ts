import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createSocialMediaThunk, deleteSocialMediaThunk, fetchSocialMediaByIdThunk, toggleSocialMediaThunk, updateSocialMediaThunk } from "@/redux/thunk/social-media.thunk";

//Function to create social media
export const createSocialMedia = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createSocialMediaThunk(createPayload));
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

//Function to fetch social media by id
export const fetchSocialMediaById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchSocialMediaByIdThunk(fetchByIdPayload));
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

//Function to update social media
export const updateSocialMedia = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateSocialMediaThunk({ uuid, payload: updatePayload }));
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

//Function to delete social media
export const deleteSocialMedia = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteSocialMediaThunk(deletePayload));
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


//Function to toggle social media  
export const toggleSocialMedia = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleSocialMediaThunk(data));
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
