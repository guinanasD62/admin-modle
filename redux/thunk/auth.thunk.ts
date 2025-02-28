import { createAsyncThunk } from "@reduxjs/toolkit";
import { publicClient } from "@/http/http-client";

//Thunk to handel login
interface ILoginPayload {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload) => {
    try {
      const res = await publicClient.post("/auth/admin/login", payload);
      return res.data;
    } catch (error: any) {
      if(error?.response?.data){
        return error?.response?.data;
      }
      return error;
    }
  }
);
