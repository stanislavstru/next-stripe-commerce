"use server";

import { spreaderRequests } from "../http";
import {
  PreOrdersEntity,
  CreatePreOrdersDto,
} from "../types/api/types-from-swagger";

export async function createPreOrder(body: CreatePreOrdersDto) {
  const response = await spreaderRequests<PreOrdersEntity>({
    path: "/pre-orders",
    type: "POST",
    body,
  });

  return response?.response;
}
