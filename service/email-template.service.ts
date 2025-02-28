import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  fetchEmailTemplateByIdThunk,
  toggleEmailTemplateThunk,
  updateEmailTemplateThunk,
} from "@/redux/thunk/email-template.thunk";


//Function to fetch email template by id
export const fetchEmailTemplateById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchEmailTemplateByIdThunk(fetchByIdPayload)
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

//Function to update email template.
export const updateEmailTemplate = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateEmailTemplateThunk({ uuid, payload: updatePayload })
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

//Function to toggle email template visibility.
export const toggleEmailTemplate = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleEmailTemplateThunk(data));
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
