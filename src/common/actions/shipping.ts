"use server";

import { spreaderRequests } from "../http";
import { Shipment } from "shippo";
import { Address } from "shippo";

export async function getShippingMethods(body: {
  addressTo: Address;
  cart: ClientCartItem[];
}) {
  const response = await spreaderRequests<Shipment>({
    path: "/shipping/calculate",
    type: "POST",
    body,
  });

  return response?.response;
}
