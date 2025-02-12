"use server";

import { spreaderRequests } from "../http";
import {
  PaymentIntentResponseDto,
  PaymentIntentRequestDto,
} from "../types/api/types-from-swagger";

export async function getPaymentLink(body: PaymentIntentRequestDto) {
  const response = await spreaderRequests<PaymentIntentResponseDto>({
    path: "/payments/to-payment-system",
    type: "POST",
    body,
  });

  return response?.response;
}
