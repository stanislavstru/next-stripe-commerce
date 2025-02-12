import { AppState } from "../types";
import { INTERNAL_NAMES } from "@/common/config/main-client-config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCartInfoByLocalStorageCart } from "@/common/actions/cart";

const initialCartState: {
  status: "initial" | "loading" | "succeeded" | "failed";
  data: ClientCartInfo;
} = {
  status: "initial",
  data: {
    cart: [],
    totalPrice: "0",
    totalWeight: {
      weight: "0",
      massUnit: "",
    },
    totalDimensions: {
      width: "0",
      height: "0",
      length: "0",
      distanceUnit: "",
    },
  },
};

export const fetchCartInfo = createAsyncThunk(
  "cartInfo/fetchCartInfo",
  async () => {
    try {
      const cartData = localStorage.getItem(INTERNAL_NAMES.LOCAL_STORAGE_CART);

      if (!cartData) return initialCartState.data;

      const response = await getCartInfoByLocalStorageCart(
        JSON.parse(cartData)
      );

      if (response) {
        return response;
      } else {
        throw new Error("Failed to fetch cart");
      }
    } catch (error: any) {
      throw new Error(error?.message ?? "Failed to fetch cart");
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    getCartFromLocalStorage: () => {
      const cartData = localStorage.getItem(INTERNAL_NAMES.LOCAL_STORAGE_CART);

      return cartData ? JSON.parse(cartData) : [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCartInfo.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartInfo.fulfilled, (state, action) => {
      return {
        ...state,
        status: "succeeded",
        data: action.payload ?? initialCartState.data,
      };
    });
    builder.addCase(fetchCartInfo.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const { getCartFromLocalStorage } = cartSlice.actions;

export const selectCartInfo = (state: AppState) => state.cart;

export default cartSlice.reducer;
