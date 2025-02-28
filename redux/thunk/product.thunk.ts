import { privateClient } from "@/http/http-client";
import { createAsyncThunk } from "@reduxjs/toolkit";

//Thunk to fetch product by slug
export const fetchProductBySlugThunk = createAsyncThunk(
    "product/fetch-product-by-slug",
    async (slug: string) => {
      try {
        const res = await privateClient.get(
          `/product/fetchProductBySlugForAdmin/${slug}`
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


  //Thunk to fetch product variant
export const fetchProductVariantsThunk = createAsyncThunk(
    "product/fetch-product-variants",
    async (uuid: any) => {
      try {
        const res = await privateClient.get(`/product/seller/variant/${uuid}`);
        return res.data;
      } catch (error: any) {
        if (error?.response?.data) {
          return error?.response?.data;
        }
        return error;
      }
    }
  );


//Thunk to fetch product images.
export const fetchProductImagesByIdThunk = createAsyncThunk(
    "product/fetch-product-images",
    async (productId: number) => {
      try {
        const res = await privateClient.get(
          `/product/fetchProductImagesById/${productId}`
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