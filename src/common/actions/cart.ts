"use server";

import { spreaderRequests } from "../http";

export async function getCart() {
  const response = await spreaderRequests<ClientCartItem[]>({
    path: "/cart/get-v2",
  });

  return response?.response;
}

export async function getCartInfoByLocalStorageCart(body: ClientCartItem[]) {
  const response = await spreaderRequests<ClientCartInfo>({
    path: "/cart/find",
    type: "POST",
    body,
  });

  return response?.response;
}
