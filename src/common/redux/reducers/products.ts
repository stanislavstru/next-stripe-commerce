import { AppState } from "../types";
import { getProducts } from "@/common/actions/products";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProductsEntity } from "@/common/types/api/types-from-swagger";

const initialProductsState: {
  status: "initial" | "loading" | "succeeded" | "failed";
  data: ProductsEntity[];
} = {
  status: "initial",
  data: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await getProducts();

      return response ?? [];
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: initialProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        data: action.payload ?? [],
      };
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {} = productSlice.actions;

export const selectProduct = (state: AppState) => state.products;

export default productSlice.reducer;
