"use client";

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./reducers/products";
import ProductCategories from "./reducers/product-categories";
import modalsReducer from "./reducers/modals";
import configReducer from "./reducers/config";
import cartReducer from "./reducers/cart";

const isDevMode = process.env.NODE_ENV === "development";

export const reducers = combineReducers({
  products: productsReducer,
  productCategories: ProductCategories,
  modals: modalsReducer,
  config: configReducer,
  cart: cartReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: reducers,
    devTools: isDevMode,
  });
};
