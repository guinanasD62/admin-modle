import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";

import {
    createAttributeThunk,
    deleteAttributeThunk,
    fetchAttributeByIdThunk,
    fetchAttributeForDropDownThunk,
    toggleAttributeThunk,
    updateAttributeThunk,
} from "@/redux/thunk/attribute.thunk";

//Function to create attribute
export const createAttribute = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createAttributeThunk(createPayload));
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

//Function to delete attribute
export const deleteAttribute = async (deletePayload: any) => {
    try {
        const { payload } = await store.dispatch(deleteAttributeThunk(deletePayload));
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

//Function to fetch attribute by id
export const fetchAttributeById = async (fetchByIdPayload: any) => {
    try {
        const { payload } = await store.dispatch(
            fetchAttributeByIdThunk(fetchByIdPayload)
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

//Function to update attribute
export const updateAttribute = async (uuid: string, updatePayload: any) => {
    try {
        const { payload } = await store.dispatch(
            updateAttributeThunk({ uuid, payload: updatePayload })
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

//Function to fetch attribute for dropdown
export const fetchAttributeForDropdown = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchAttributeForDropDownThunk());
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

//Function to toggle attributes  
export const toggleAttributes = async (data: any) => {
    try {
        const { payload } = await store.dispatch(toggleAttributeThunk(data));
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
