"use server";

import { RequestInitCustom } from "./fetchConnection";
import { methodWrapper } from "./fetchConnection";

const services = {
  defaultAPI: "/api/v1",
};

const baseURL: string | undefined = process.env.NEXT_PUBLIC_SERVER_HOST;

export const spreaderRequests = async <T, R = any>({
  service = "defaultAPI",
  type = "GET",
  path,
  body,
  options,
}: {
  service?: keyof typeof services;
  type?: "GET" | "POST" | "DELETE" | "PUT";
  path: string;
  body?: R;
  options?: RequestInitCustom;
}) => {
  const apiEndPoint = `${baseURL}${services[service]}${path}`;

  switch (type) {
    case "GET":
      return methodWrapper<T>(`${apiEndPoint}`, undefined, "GET", options);
    case "POST":
      return methodWrapper<T, R>(`${apiEndPoint}`, body, "POST", options);
    case "DELETE":
      return methodWrapper<T, R>(`${apiEndPoint}`, body, "DELETE", options);
    case "PUT":
      return methodWrapper<T, R>(`${apiEndPoint}`, body, "PUT", options);
  }
};
