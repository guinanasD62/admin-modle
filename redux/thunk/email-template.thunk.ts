import queryString from "query-string";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { privateClient } from "@/http/http-client";

//Thunk to fetch email template list
interface IListPayload {
  pageSize: number;
  currentPage: number;
  seachFilter: string;
}

export const emailTemplateListThunk = createAsyncThunk(
  "email-template/list",
  async (payload: IListPayload) => {
    try {
      const queryParams = queryString.stringify(payload);
      const res = await privateClient.get(`/email-template?${queryParams}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to create email template
interface IEmailTemplatePayload {
  template_name: string;
  subject: string;
  html_content: string;
  is_active?: boolean;
}

//Thunk to fetch email template by id
interface IFetchEmailTemplateByIdPayload {
  uuid: string;
}

export const fetchEmailTemplateByIdThunk = createAsyncThunk(
  "email-template/fetchById",
  async (payload: IFetchEmailTemplateByIdPayload) => {
    try {
      const res = await privateClient.get(`/email-template/${payload}`);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to update email template
interface IEmailTemplatePayload {
  template_name: string;
  subject: string;
  html_content: string;
  is_active?: boolean;
}
interface IUpdateEmailTemplate {
  uuid: string;
  payload: IEmailTemplatePayload;
}
export const updateEmailTemplateThunk = createAsyncThunk(
  "email-template/update",
  async ({ uuid, payload }: IUpdateEmailTemplate) => {
    try {
      const res = await privateClient.patch(`/email-template/${uuid}`, payload);
      return res.data;
    } catch (error: any) {
      if (error?.response?.data) {
        return error?.response?.data;
      }
      return error;
    }
  }
);

//Thunk to toggle email template
export const toggleEmailTemplateThunk = createAsyncThunk(
  "email-template/toggle",
  async (payload: any) => {
    try {
      const res = await privateClient.patch(
        `/email-template/toggle/visibility/${payload?.uuid}`,
        { is_active: payload.is_active }
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
