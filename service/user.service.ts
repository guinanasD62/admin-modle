import { refreshData } from "@/redux/slice/datatable.slice";
import { store } from "@/redux/store";
import {
  fetchSellerVerificationByIdThunk,
  loadAdminBasicInfoByIdThunk,
  loadConsumerBasicInfoByIdThunk,
  loadFinancierBasicInfoByIdThunk,
  loadSellerBankDetailsByIdThunk,
  loadSellerBasicInfoByIdThunk,
  updateSellerBusinessDetailsStatusThunk,
  fetchSellerDocumentsByIdThunk,
  updateSellerBankDetailsStatusThunk,
  updateSellerVerificationDetailsStatusThunk,
  updateSellerDocumentDetailsStatusThunk,
  viewDocumentThunk,
  loadSellerMobileNumberByIdThunk,
  loadSellerEmailByIdThunk,
  loadConsumerAadharCardByIdThunk,
  loadConsumerPanCardByIdThunk,
  toggleUserThunk,
  toggleFinancierThunk,
  toggleSellerThunk,
  deleteUserAdminThunk,
  deleteUserSupplierThunk,
  deleteUserConsumerThunk,
  createSubAdminThunk,
} from "@/redux/thunk/user.thunk";
//Function to fetch consumer basic info by id
export const fetchConsumerBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadConsumerBasicInfoByIdThunk(fetchByIdPayload)
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

//Function to fetch seller basic info by id
export const fetchSellerBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerBasicInfoByIdThunk(fetchByIdPayload)
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

//Function to fetch admin basic info by id
export const fetchAdminBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadAdminBasicInfoByIdThunk(fetchByIdPayload)
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

//Function to fetch financier basic info by id
export const fetchFinancierBasicDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadFinancierBasicInfoByIdThunk(fetchByIdPayload)
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

//Function to fetch seller bank details by id
export const fetchSellerBankDetailsById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerBankDetailsByIdThunk(fetchByIdPayload)
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

//Function to fetch seller verification by id
export const fetchSellerVerificationById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchSellerVerificationByIdThunk(fetchByIdPayload)
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

//Function to fetch seller document by id
export const fetchSellerDocumentById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      fetchSellerDocumentsByIdThunk(fetchByIdPayload)
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

//Function to fetch seller basic details status.
export const updateBusinessDetailsStatus = async (
  updateBusinessDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerBusinessDetailsStatusThunk(updateBusinessDetailsStatusPayload)
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

//Function to fetch seller bank details status.
export const updateBankDetailsStatus = async (
  updateBankingDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerBankDetailsStatusThunk(updateBankingDetailsStatusPayload)
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

//Function to fetch seller verification details status.
export const updateVerificationDetailsStatus = async (
  updateVerificaionDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerVerificationDetailsStatusThunk(
        updateVerificaionDetailsStatusPayload
      )
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

//Function to fetch seller document details status.
export const updateDocumentDetailsStatus = async (
  updateDocumentDetailsStatusPayload: any
) => {
  try {
    const { payload } = await store.dispatch(
      updateSellerDocumentDetailsStatusThunk(updateDocumentDetailsStatusPayload)
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

//Function to view sellers document.
export const viewDocument = async (key: string) => {
  try {
    const { payload } = await store.dispatch(viewDocumentThunk(key));
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

//Function to fetch seller mobile-number by id
export const fetchSellerMobileNumberById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerMobileNumberByIdThunk(fetchByIdPayload)
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

//Function to fetch seller email by id
export const fetchSellerEmailById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadSellerEmailByIdThunk(fetchByIdPayload)
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

//Function to fetch consumer aadhar-card by id
export const fetchConsumerAadharCardById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadConsumerAadharCardByIdThunk(fetchByIdPayload)
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

//Function to fetch consumer pan-card by id
export const fetchConsumerPanCardById = async (fetchByIdPayload: any) => {
  try {
    const { payload } = await store.dispatch(
      loadConsumerPanCardByIdThunk(fetchByIdPayload)
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

//Function to toggle user status
export const toggleUser = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleUserThunk(data));
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

//Function to toggle seller status
export const toggleSeller = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleSellerThunk(data));
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

//Function to toggle financier status
export const toggleFinancier = async (data: any) => {
  try {
    const { payload } = await store.dispatch(toggleFinancierThunk(data));
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

//Function to delete User > Admin
export const deleteUserAdmin = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      deleteUserAdminThunk(deletePayload)
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

//Function to delete User > Supplier
export const deleteUserSupplier = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      deleteUserSupplierThunk(deletePayload)
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

//Function to delete User > Consumer
export const deleteUserConsumer = async (deletePayload: any) => {
  try {
    const { payload } = await store.dispatch(
      deleteUserConsumerThunk(deletePayload)
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

//Function to create sub-admin
export const createSubAdmin = async (createPayload: any) => {
  try {
    const { payload } = await store.dispatch(createSubAdminThunk(createPayload));
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

