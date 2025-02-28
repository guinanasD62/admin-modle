import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  createTestimonialThunk,
  deleteTestimonialThunk,
  fetchTestimonialByIdThunk,
  toggleTestimonialThunk,
  updateTestimonialThunk,
} from "@/redux/thunk/testimonial.thunk";

//Function to create testimonial
export const createTestimonial = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      createTestimonialThunk(createPayload)
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

//Function to fetch testimonial by id
export const fetchTestimonialById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchTestimonialByIdThunk(fetchByIdPayload)
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

//Function to update testimonial
export const updateTestimonial = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      updateTestimonialThunk({ uuid, payload: updatePayload })
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

//Function to delete testimonial
export const deleteTestimonial = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      deleteTestimonialThunk(deletePayload)
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


//Function to toggle testimonials  
export const toggleTestimonials = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleTestimonialThunk(data));
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
