import { registerLog } from "./logs-service";
export const preparedServerErrorMessages = (
  response: any,
  method: string,
  fullUrl: string,
  statusCode?: number
) => {
  const message = response?.error?.message
    ? `${response?.error?.message}`
    : response?.error?.data
    ? JSON.stringify(response?.error?.data)
    : response?.message
    ? response.message
    : undefined;

  const status =
    response?.error?.code ?? response?.code ?? statusCode ?? undefined;

  const statusText = response?.error?.type ?? response?.type ?? undefined;

  const type = response?.name ?? response?.name ?? "Error";

  registerLog({
    type,
    method: method,
    status,
    statusText,
    url: fullUrl,
    eventType: "Server API",
    ...(message ? { message } : {}),
  });
};
