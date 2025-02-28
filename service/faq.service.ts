import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";

import {
    createFaqThunk,
    deleteFaqThunk,
    fetchFaqTypesThunk,
    fetchFaqByIdThunk,
    fetchFaqForDropDownThunk,
    updateFaqThunk,
    toggleFaqThunk,
} from "@/redux/thunk/faq.thunk";

//Function to create uom
export const createFaq = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createFaqThunk(createPayload));
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

//Function to delete uom
export const deleteFaq = async (deletePayload: any) => {
    try {
        const { payload } = await store.dispatch(deleteFaqThunk(deletePayload));
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

//Function to fetch uom by id
export const fetchFaqById = async (fetchByIdPayload: any) => {
    try {
        const { payload } = await store.dispatch(
            fetchFaqByIdThunk(fetchByIdPayload)
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

//Function to update uom
export const updateFaq = async (uuid: string, updatePayload: any) => {
    try {
        const { payload } = await store.dispatch(
            updateFaqThunk({ uuid, payload: updatePayload })
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

//Function to fetch uom for dropdown
export const fetchFaqForDropdown = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchFaqForDropDownThunk());
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

//Function to fetch Faq Type
export const fetchFaqTypes = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchFaqTypesThunk());
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


//Function to toggle faq  
export const toggleFaq = async (data: any) => {
    try {
        const { payload } = await store.dispatch(toggleFaqThunk(data));
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




