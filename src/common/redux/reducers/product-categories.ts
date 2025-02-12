import { AppState } from "../types";
import { getProductsCategories } from "@/common/actions/product-categories";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductCategoriesEntity } from "@/common/types/api/types-from-swagger";

const initialProductCategoriesState: {
  status: "initial" | "loading" | "succeeded" | "failed";
  data: {
    active: ProductCategoriesEntity["id"] | null;
    categories: ProductCategoriesEntity[];
  };
} = {
  status: "initial",
  data: {
    active: null,
    categories: [],
  },
};

export const fetchProductCategories = createAsyncThunk(
  "productCategories/fetchProductCategories",
  async () => {
    try {
      const response = await getProductsCategories();

      return response?.response ?? [];
    } catch (error) {
      console.error("Failed to fetch products categories", error);
      return [];
    }
  }
);

export const productCategoriesSlice = createSlice({
  name: "productsCategories",
  initialState: initialProductCategoriesState,
  reducers: {
    setActiveCategory: (
      state,
      action: PayloadAction<
        (typeof initialProductCategoriesState)["data"]["active"]
      >
    ) => {
      state.data.active = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductCategories.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
      return {
        status: "succeeded",
        data: {
          active: null,
          categories: action.payload ?? [],
        },
      };
    });
    builder.addCase(fetchProductCategories.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { setActiveCategory } = productCategoriesSlice.actions;

export const selectProductCategories = (state: AppState) =>
  state.productCategories;

export default productCategoriesSlice.reducer;
