"use server";

import { spreaderRequests } from "../http";
import { CreateFeedbackRequestsDto } from "../types/api/types-from-swagger";

export async function setFeedbackRequests(body: CreateFeedbackRequestsDto) {
  const response = await spreaderRequests({
    path: "/feedback-requests",
    type: "POST",
    body,
  });

  return response?.response;
}
