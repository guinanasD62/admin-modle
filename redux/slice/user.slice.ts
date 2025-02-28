import { createSlice } from "@reduxjs/toolkit";
import {
  adminListThunk,
  consumerListThunk,
  createSubAdminThunk,
  fetchSellerDocumentsByIdThunk,
  fetchSellerVerificationByIdThunk,
  financierListThunk,
  loadAdminBasicInfoByIdThunk,
  loadConsumerAadharCardByIdThunk,
  loadConsumerBasicInfoByIdThunk,
  loadConsumerPanCardByIdThunk,
  loadFinancierBasicInfoByIdThunk,
  loadSellerBankDetailsByIdThunk,
  loadSellerBasicInfoByIdThunk,
  loadSellerEmailByIdThunk,
  loadSellerMobileNumberByIdThunk,
  supplierListThunk,
  toggleFinancierThunk,
  toggleSellerThunk,
  toggleUserThunk,
  updateSellerBankDetailsStatusThunk,
  updateSellerBusinessDetailsStatusThunk,
  updateSellerDocumentDetailsStatusThunk,
  updateSellerVerificationDetailsStatusThunk,
  viewDocumentThunk,
} from "../thunk/user.thunk";

const initialState = {
  isLoading: false,
  list: [],
  error: {},
  refresh: false,
};

export const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetList: (state) => {
      state.list = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(adminListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(adminListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(adminListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(supplierListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(supplierListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(supplierListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(consumerListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(consumerListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(consumerListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(financierListThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(financierListThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.list = action?.payload?.data?.result || [];
      })
      .addCase(financierListThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadAdminBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadAdminBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadAdminBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadSellerBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadSellerBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadSellerBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadConsumerBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadConsumerBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadConsumerBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadFinancierBasicInfoByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadFinancierBasicInfoByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadFinancierBasicInfoByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadSellerBankDetailsByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadSellerBankDetailsByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadSellerBankDetailsByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });

    builder
      .addCase(fetchSellerVerificationByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSellerVerificationByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchSellerVerificationByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(fetchSellerDocumentsByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        fetchSellerDocumentsByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(fetchSellerDocumentsByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateSellerBusinessDetailsStatusThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateSellerBusinessDetailsStatusThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(
        updateSellerBusinessDetailsStatusThunk.rejected,
        (state: any) => {
          state.isLoading = false;
        }
      );
    builder
      .addCase(updateSellerBankDetailsStatusThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateSellerBankDetailsStatusThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(updateSellerBankDetailsStatusThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateSellerVerificationDetailsStatusThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateSellerVerificationDetailsStatusThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(updateSellerVerificationDetailsStatusThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(updateSellerDocumentDetailsStatusThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        updateSellerDocumentDetailsStatusThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(updateSellerDocumentDetailsStatusThunk.rejected, (state: any) => {
        state.isLoading = false;
      });

    builder
      .addCase(loadSellerEmailByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loadSellerEmailByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(loadSellerEmailByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(viewDocumentThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        viewDocumentThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(viewDocumentThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadSellerMobileNumberByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(loadSellerMobileNumberByIdThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
      })
      .addCase(loadSellerMobileNumberByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadConsumerAadharCardByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadConsumerAadharCardByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadConsumerAadharCardByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(loadConsumerPanCardByIdThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(
        loadConsumerPanCardByIdThunk.fulfilled,
        (state: any, action: any) => {
          state.isLoading = false;
        }
      )
      .addCase(loadConsumerPanCardByIdThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleUserThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleUserThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleUserThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleSellerThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleSellerThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleSellerThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(toggleFinancierThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(toggleFinancierThunk.fulfilled, (state: any) => {
        state.isLoading = false;
        state.refresh = !state.refresh;
      })
      .addCase(toggleFinancierThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
    builder
      .addCase(createSubAdminThunk.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createSubAdminThunk.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.error = action?.payload;
        state.refresh = !state.refresh;
      })
      .addCase(createSubAdminThunk.rejected, (state: any) => {
        state.isLoading = false;
      });
  },
});

export const { resetList } = user.actions;

export default user.reducer;
