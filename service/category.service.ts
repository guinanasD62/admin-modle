import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createCategoryThunk, deleteCategoryThunk, fetchCategoryByIdThunk, fetchCategoryDropdownThunk, toggleCategoryThunk, updateCategoryThunk } from "@/redux/thunk/category.thunk";

//Function to create category
export const createCategory = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createCategoryThunk(createPayload));
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

//Function to fetch category by id
export const fetchCategoryById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(fetchCategoryByIdThunk(fetchByIdPayload));
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

//Function to update category
export const updateCategory = async (uuid: string, updatePayload: any) => {
  try {
    const { payload } = await store.dispatch(updateCategoryThunk({ uuid, payload: updatePayload }));
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

//Function to delete category
export const deleteCategory = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(deleteCategoryThunk(deletePayload));
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


//Function to fetch categories for dropdown
export const fetchCategoryDropdown = async () => {
  try {
    const { payload } = await store.dispatch(fetchCategoryDropdownThunk());
    return payload;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong."
    );
  }
};

//Function to toggle category  
export const toggleCategory = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleCategoryThunk(data));
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
