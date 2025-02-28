import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch list of admin,seller and
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const adminListThunk = createAsyncThunk(
  "user/fetchAllAdmin",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/admin?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const supplierListThunk = createAsyncThunk(
  "user/fetchAllSupplier",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/seller?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const consumerListThunk = createAsyncThunk(
  "user/fetchAllConsumers",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/user?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const financierListThunk = createAsyncThunk(
  "user/fetchAllFinanciers",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/financier?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadSellerBasicInfoByIdPayload {
  uuid: string;
}
export const loadSellerBasicInfoByIdThunk = createAsyncThunk(
  "user/loadSupplierBasicInfoById",
  async (payload: loadSellerBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(
        `/seller/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadConsumerBasicInfoByIdPayload {
  uuid: string;
}
export const loadConsumerBasicInfoByIdThunk = createAsyncThunk(
  "user/loadConsumerBasicInfoById",
  async (payload: loadConsumerBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(`/user/basic-information/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadFinancierBasicDetailsInfoById {
  uuid: string;
}
export const loadFinancierBasicInfoByIdThunk = createAsyncThunk(
  "user/loadFinancierBasicInfoById",
  async (payload: loadFinancierBasicDetailsInfoById) => {
    try {
      const res = await privateClient.get(
        `/financier/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadAdminUserBasicInfoByIdPayload {
  uuid: string;
}
export const loadAdminBasicInfoByIdThunk = createAsyncThunk(
  "user/loadAdminBasicInfoById",
  async (payload: loadAdminUserBasicInfoByIdPayload) => {
    try {
      const res = await privateClient.get(
        `/admin/basic-information/${payload}`
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch seller bank details by id...
interface loadSellerBankDetailsByIdPayload {
  uuid: string;
}
export const loadSellerBankDetailsByIdThunk = createAsyncThunk(
  "user/loadSellerBankDetailsById",
  async (payload: loadSellerBankDetailsByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/bank-details/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch seller verification by id
interface fetchSellerVerificationByIdPayload {
  uuid: string;
}
export const fetchSellerVerificationByIdThunk = createAsyncThunk(
  "user/loadSellerVerificationById",
  async (payload: fetchSellerVerificationByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/verification/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to fetch  seller documents by id
interface fetchSellerDocumentsByIdPayload {
  uuid: string;
}
export const fetchSellerDocumentsByIdThunk = createAsyncThunk(
  "user/loadSellerDocuments",
  async (payload: fetchSellerDocumentsByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/document/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update onboarding status...
interface updateSellerBusinessDetailsStatusPayload {
  uuid: string;
  admin_status: string;
  reason?: string;
}
export const updateSellerBusinessDetailsStatusThunk = createAsyncThunk(
  "user/update-seller-business-details-status",
  async (payload: updateSellerBusinessDetailsStatusPayload) => {
    try {
      const pay =
        payload?.admin_status === "APPROVED"
          ? { admin_status: payload.admin_status }
          : { admin_status: payload.admin_status, reason: payload.reason };

      const res = await privateClient.patch(
        `/admin/on-boarding/basic-info-update/${payload.uuid}`,
        pay
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update onboarding status...
interface updateSellerBankDetailsStatusPayload {
  uuid: string;
  admin_status: string;
  reason?: string;
}
export const updateSellerBankDetailsStatusThunk = createAsyncThunk(
  "user/update-seller-bank-details-status",
  async (payload: updateSellerBankDetailsStatusPayload) => {
    try {
      const pay =
        payload?.admin_status === "APPROVED"
          ? { admin_status: payload.admin_status }
          : { admin_status: payload.admin_status, reason: payload.reason };
      const res = await privateClient.patch(
        `/admin/on-boarding/banking-info-update/${payload.uuid}`,
        pay
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update onboarding status...
interface updateSellerVerificationDetailsStatusPayload {
  uuid: string;
  admin_status: string;
  reason?: string;
}
export const updateSellerVerificationDetailsStatusThunk = createAsyncThunk(
  "user/update-seller-verification-details-status",
  async (payload: updateSellerVerificationDetailsStatusPayload) => {
    try {
      const pay =
        payload?.admin_status === "APPROVED"
          ? { admin_status: payload.admin_status }
          : { admin_status: payload.admin_status, reason: payload.reason };
      const res = await privateClient.patch(
        `/admin/on-boarding/verification-update/${payload.uuid}`,
        pay
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update onboarding status...
interface updateSellerDocumentDetailsStatusPayload {
  uuid: string;
  admin_status: string;
  document_uuid: string;
  reason?: string;
}
export const updateSellerDocumentDetailsStatusThunk = createAsyncThunk(
  "user/update-seller-document-details-status",
  async (payload: updateSellerDocumentDetailsStatusPayload) => {
    try {
      const pay =
        payload?.admin_status === "APPROVED"
          ? {
              admin_status: payload.admin_status,
              document_id: payload.document_uuid,
            }
          : {
              admin_status: payload.admin_status,
              reason: payload.reason,
              document_id: payload.document_uuid,
            };

      const res = await privateClient.patch(
        `/admin/on-boarding/document-update/${payload.uuid}`,
        pay
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//view document thunk....
export const viewDocumentThunk = createAsyncThunk(
  "user/view-document",
  async (key: string) => {
    try {
      const res = await privateClient.get(`/seller/view?key=${key}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadSellerMobileNumberByIdPayload {
  uuid: string;
}
export const loadSellerMobileNumberByIdThunk = createAsyncThunk(
  "user/loadSupplierMobileNumberById",
  async (payload: loadSellerMobileNumberByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/mobile-number/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadSellerEmailByIdPayload {
  uuid: string;
}
export const loadSellerEmailByIdThunk = createAsyncThunk(
  "user/loadSupplierEmailById",
  async (payload: loadSellerEmailByIdPayload) => {
    try {
      const res = await privateClient.get(`/seller/email/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadConsumerAadharCardByIdPayload {
  uuid: string;
}
export const loadConsumerAadharCardByIdThunk = createAsyncThunk(
  "user/loadConsumerAadharCardById",
  async (payload: loadConsumerAadharCardByIdPayload) => {
    try {
      const res = await privateClient.get(`/user/aadhar-card/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

interface loadConsumerPanCardByIdPayload {
  uuid: string;
}
export const loadConsumerPanCardByIdThunk = createAsyncThunk(
  "user/loadConsumerPanCardById",
  async (payload: loadConsumerPanCardByIdPayload) => {
    try {
      const res = await privateClient.get(`/user/pan-card/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle User
export const toggleUserThunk = createAsyncThunk(
  "user/toggle-user",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(
        `/user/toggle/visibility/${payload?.uuid}`,
        { status: payload.status }
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle Seller
export const toggleSellerThunk = createAsyncThunk(
  "seller/toggle-seller",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(
        `/seller/toggle/visibility/${payload?.uuid}`,
        { status: payload.status }
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle Financier
export const toggleFinancierThunk = createAsyncThunk(
  "financier/toggle-financier",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(
        `/financier/toggle/visibility/${payload?.uuid}`,
        { status: payload.status }
      );
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to delete User > Consumer
interface IDeleteFaqPayload {
  uuid: string;
}

export const deleteUserConsumerThunk = createAsyncThunk(
  "user/delete",
  async (payload: IDeleteFaqPayload) => {
    try {
      const res = await privateClient.delete(`/user/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
export const deleteUserAdminThunk = createAsyncThunk(
  "admin/delete",
  async (payload: IDeleteFaqPayload) => {
    try {
      const res = await privateClient.delete(`/admin/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

export const deleteUserSupplierThunk = createAsyncThunk(
  "admin/delete",
  async (payload: IDeleteFaqPayload) => {
    try {
      const res = await privateClient.delete(`/seller/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);


//Thunk to create sub-admin
interface ICreateSubAdminPayload {
  first_name: string,
  last_name: string,
  email: string,
  mobile_number: string,
  password: string,
  confirm_password: string
}

export const createSubAdminThunk = createAsyncThunk(
  "sub-admin/create",
  async (payload: ICreateSubAdminPayload) => {
    try {
      const res = await privateClient.post("/admin", payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);
