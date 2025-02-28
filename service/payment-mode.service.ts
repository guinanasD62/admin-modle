import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import { createPaymentModeThunk, deletePaymentModeThunk, fetchPaymentModeByIdThunk, togglePaymentModeThunk, updatePaymentModeThunk } from "@/redux/thunk/payment-mode.thunk";

//Function to create PaymentMode
export const createPaymentMode = async (createPayload: any) => {
    try {

        const { payload } = await store.dispatch(createPaymentModeThunk(createPayload));

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

//Function to fetch PaymentMode by id
export const fetchPaymentModeById = async (fetchByIdPayload: any) => {
    try {
        const { payload } = await store.dispatch(fetchPaymentModeByIdThunk(fetchByIdPayload));
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

//Function to update PaymentMode
export const updatePaymentMode = async (uuid: string, updatePayload: any) => {
    try {
        const { payload } = await store.dispatch(updatePaymentModeThunk({ uuid, payload: updatePayload }));
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

//Function to delete PaymentMode
export const deletePaymentMode = async (deletePayload: any) => {
    try {
        const { payload } = await store.dispatch(deletePaymentModeThunk(deletePayload));
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


//Function to toggle PaymentMode
export const togglePaymentMode = async (data: any) => {
    try {
        const { payload } = await store.dispatch(togglePaymentModeThunk(data));
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