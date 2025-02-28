import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { deleteContactUsThunk } from "@/redux/thunk/contact-us.thunk";

//Function to delete contact us
export const deleteContactUs = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      deleteContactUsThunk(deletePayload)
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
