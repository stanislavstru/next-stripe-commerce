"use server";

// import { permanentRedirect } from "next/navigation";
import { registerLog } from "./logs-service";

type FetctTypeAnswer = "json" | "text" | "blob" | "arraybuffer";
export type RequestInitCustom = RequestInit & {
  responseType?: FetctTypeAnswer;
};

export const methodWrapper = async <T, R = any>(
  path: string,
  body: R | undefined,
  method: "GET" | "POST" | "DELETE" | "PUT",
  options?: RequestInitCustom
) => {
  const isFormData = body instanceof FormData;
  const preparedOptions = {
    ...options,
    method,
    ...(body ? { body: isFormData ? body : JSON.stringify(body) } : {}),
  };

  try {
    const requestToFetch = makeFetch(path, preparedOptions);
    const response = await requestToFetch();

    if (response?.status === 401) {
      throw { statusCode: response.status };
    }

    const result = (await response.json()) as {
      response: T | null;
      error: string | null;
      statusCode: number;
    };

    if (response?.ok) {
      return result;
    } else {
      throw {
        status: result.statusCode || response.status,
        statusText: response.statusText,
        message: result.error,
        method,
        url: path,
      };
    }
  } catch (error: any) {
    console.log(error);

    const message = error?.message
      ? `${error?.message}`
      : "Error fetching data on NEXTJS side";

    registerLog({
      type: error?.name ?? "Error",
      method: error?.method ?? method,
      status: error?.status,
      statusText: error?.statusText,
      url: error?.url ?? path,
      message: message,
    });

    // if (error?.statusCode === 401) {
    //   permanentRedirect(process.env.NEXT_PUBLIC_HOST + "/sign-out");
    // }

    return {
      response: null,
      error: message,
      statusCode: error?.status,
    };
  }
};

const makeFetch = (fullUrl: string, options: RequestInitCustom | undefined) => {
  return async function () {
    const headers: HeadersInit = {};
    const isFormData = options?.body instanceof FormData;

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    return fetch(fullUrl, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });
  };
};
