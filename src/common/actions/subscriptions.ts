"use server";

import { spreaderRequests } from "../http";
import { SubscriptionsDto } from "../types/api/types-from-swagger";
import {
  SubscriptionCreateByTypeDto,
  SubscriptionsByIdDto,
} from "../types/api/types-from-swagger";

export async function createSubscriptionsByType(
  body: SubscriptionCreateByTypeDto
) {
  const response = await spreaderRequests<SubscriptionsDto>({
    path: "/subscriptions/create-by-type",
    type: "POST",
    body,
  });

  return response?.response;
}

export async function getSubscriptionsBySubscriptionId(subscriptionId: string) {
  const response = await spreaderRequests<SubscriptionsByIdDto[]>({
    path: `/subscriptions/${subscriptionId}`,
  });

  return response?.response || [];
}

export async function deleteSubscription(subscriptionId: string) {
  const response = await spreaderRequests<SubscriptionsByIdDto>({
    path: `/subscriptions/${subscriptionId}`,
    type: "DELETE",
  });

  console.log(response);

  return response?.response;
}
