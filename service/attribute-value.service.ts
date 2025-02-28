import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createAttributeValueThunk, deleteAttributeValueThunk, fetchAttributeValueByIdThunk, fetchAttributeValueDropdownThunk, toggleAttributeValueThunk, updateAttributeValueThunk } from "@/redux/thunk/attribute-value.thunk";

//Function to create attribute value
export const createAttributeValue = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createAttributeValueThunk(createPayload));
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

//Function to fetch attribute value by id
export const fetchAttributeValueById = async (fetchByIdPayload: any) => {
    try {
        const { payload } = await store.dispatch(fetchAttributeValueByIdThunk(fetchByIdPayload));
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

//Function to update attribute value
export const updateAttributeValue = async (uuid: string, updatePayload: any) => {
    try {
        const { payload } = await store.dispatch(updateAttributeValueThunk({ uuid, payload: updatePayload }));
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

//Function to delete attribute value
export const deleteAttributeValue = async (deletePayload: any) => {
    try {
        const { payload } = await store.dispatch(deleteAttributeValueThunk(deletePayload));
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

//Function to fetch attribute values for dropdown
export const fetchAttributeValueDropdown = async () => {
    try {
        const { payload } = await store.dispatch(fetchAttributeValueDropdownThunk());
        return payload;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message || "Something went wrong."
        );
    }
};



//Function to toggle attributes value
export const toggleAttributeValues = async (data: any) => {
    try {
        const { payload } = await store.dispatch(toggleAttributeValueThunk(data));
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
