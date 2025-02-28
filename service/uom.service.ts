import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";

import {
    createUomThunk,
    deleteUomThunk,
    fetchRoundingRuleThunk,
    fetchRoundingValueThunk,
    fetchUomByIdThunk,
    fetchUomForDropDownThunk,
    toggleUomThunk,
    updateUomThunk,
} from "@/redux/thunk/uom.thunk";

//Function to create uom
export const createUom = async (createPayload: any) => {
    try {
        const { payload } = await store.dispatch(createUomThunk(createPayload));
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
export const deleteUom = async (deletePayload: any) => {
    try {
        const { payload } = await store.dispatch(deleteUomThunk(deletePayload));
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
export const fetchUomById = async (fetchByIdPayload: any) => {
    try {
        const { payload } = await store.dispatch(
            fetchUomByIdThunk(fetchByIdPayload)
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
export const updateUom = async (uuid: string, updatePayload: any) => {
    try {
        const { payload } = await store.dispatch(
            updateUomThunk({ uuid, payload: updatePayload })
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
export const fetchUomForDropdown = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchUomForDropDownThunk());
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

//Function to fetch Rounding rule 
export const fetchRoundingRule = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchRoundingRuleThunk());
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

//Function to fetch Rounding value 
export const fetchRoundingValue = async (
) => {
    try {
        const { payload } = await store.dispatch(fetchRoundingValueThunk());
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


//Function to toggle uom  
export const toggleUom = async (data: any) => {
    try {
        const { payload } = await store.dispatch(toggleUomThunk(data));
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

