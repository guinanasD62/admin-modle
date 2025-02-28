import { store } from "@/redux/store";
import { fetchProductBySlugThunk, fetchProductImagesByIdThunk, fetchProductVariantsThunk } from "@/redux/thunk/product.thunk";


//Function to fetch product by slug.
export const fetchProductDetails = async (slug: string) => {
    try {
      const { payload } = await store.dispatch(fetchProductBySlugThunk(slug));
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


  //Function to fetch product variants
export const fetchProductVariant = async (uuid: any) => {
    try {
      const { payload } = await store.dispatch(
        fetchProductVariantsThunk(uuid)
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

//Function to fetch product images.
export const fetchProductImagesById = async (productId: number) => {
    try {
      const { payload } = await store.dispatch(
        fetchProductImagesByIdThunk(productId)
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