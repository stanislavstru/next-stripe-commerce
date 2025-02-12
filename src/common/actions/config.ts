"use server";

import { spreaderRequests } from "../http";
import { MainConfigDto } from "../types/api/types-from-swagger";

export async function getConfig() {
  const response = await spreaderRequests<MainConfigDto[]>({
    path: "/main-config",
  });

  return response?.response;
}
