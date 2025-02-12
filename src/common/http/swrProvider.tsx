"use client";

import { BareFetcher, SWRConfig } from "swr";
import { registerLog } from "./logs-service";

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        revalidateOnFocus: false,
        fetcher: swrFetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};

const swrFetcher: BareFetcher = (resource) =>
  fetch(resource).then(async (res) => {
    if (res.status === 401) {
      registerLog({
        type: "Error",
        eventType: "Server Client",
        status: res.status,
        url: resource,
        message: "From SWR fetch - Unauthorized request",
      });

      // location.href = process.env.NEXT_PUBLIC_DOMAIN_NAME + "/sign-out";
    }

    if (res?.ok) {
      const response = await res.json();

      return response;
    } else {
      registerLog({
        type: "Error",
        eventType: "Server Client",
        status: res.status,
        url: resource,
        message: "From SWR fetch",
      });
    }
  });
