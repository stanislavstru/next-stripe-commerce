"use client";

import { useEffect } from "react";
import { INTERNAL_NAMES } from "../config/main-client-config";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { selectCartInfo, fetchCartInfo } from "../redux/reducers/cart";

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { status, data: cartInfo } = useAppSelector(selectCartInfo);

  const getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem(INTERNAL_NAMES.LOCAL_STORAGE_CART);
    return cartData ? (JSON.parse(cartData) as ClientCartItem[]) : [];
  };

  useEffect(() => {
    const handleStorageChange = (e: any) => {
      if (e.key === INTERNAL_NAMES.LOCAL_STORAGE_CART) {
        dispatch(fetchCartInfo());
      }
    };

    window.addEventListener("storage", handleStorageChange, false);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const addToCart = (productId: string, quantity = 1) => {
    const cartDataFromLocalStorage = getCartFromLocalStorage();

    const foundItem = cartDataFromLocalStorage.find(
      (item) => item.productId === productId
    );

    if (foundItem) {
      foundItem.quantity += quantity;
    } else {
      cartDataFromLocalStorage.push({ productId, quantity });
    }

    localStorage.setItem(
      INTERNAL_NAMES.LOCAL_STORAGE_CART,
      JSON.stringify(cartDataFromLocalStorage)
    );

    dispatch(fetchCartInfo());
  };

  const removeFromCart = (productId: string) => {
    const cartDataFromLocalStorage = getCartFromLocalStorage();

    const newCart = cartDataFromLocalStorage.filter(
      (item) => item.productId !== productId
    );

    localStorage.setItem(
      INTERNAL_NAMES.LOCAL_STORAGE_CART,
      JSON.stringify(newCart)
    );

    dispatch(fetchCartInfo());
  };

  const setQuantity = (productId: string, quantity: number) => {
    const cartDataFromLocalStorage = getCartFromLocalStorage();

    const changedCart = cartDataFromLocalStorage.reduce((acc, item) => {
      if (item.productId === productId) {
        acc.push({ ...item, quantity });
      } else {
        acc.push(item);
      }

      return acc;
    }, [] as ClientCartItem[]);

    localStorage.setItem(
      INTERNAL_NAMES.LOCAL_STORAGE_CART,
      JSON.stringify(changedCart)
    );

    dispatch(fetchCartInfo());
  };

  return {
    status,
    cart: cartInfo.cart,
    cartLength: cartInfo.cart.length,
    getCartFromLocalStorage,
    addToCart,
    setQuantity,
    removeFromCart,
    totalPriceCart: cartInfo.totalPrice,
    totalWeightCart: cartInfo.totalWeight,
    totalDimensionsCart: cartInfo.totalDimensions,
  };
};
