"use server";

import moment from "moment";

// import { TrackEvent } from "../analytics";
export type LogType = "Error" | "Warning" | "Info" | "Debug" | "TypeError";
export type LogEventType = "Browser" | "Server Client" | "Server API";

export type Log = {
  resource?: string;
  type: LogType;
  method?: string;
  status?: number;
  statusText?: string;
  url?: string;
  message?: string;
  messageObject?: object;
  eventType?: LogEventType;
};

export type RegisterLogArgs = {
  type?: Log["type"];
  method?: Log["method"];
  status?: Log["status"];
  statusText?: Log["statusText"];
  url?: Log["url"];
  message?: Log["message"];
  messageObject?: object | undefined | null;
  eventType?: Log["eventType"];
};

export const registerLog = async ({
  type = "Info",
  method,
  status,
  statusText,
  url,
  message,
  messageObject,
  eventType = "Server API",
}: RegisterLogArgs) => {
  if (typeof window !== "undefined") {
    return fetch("/api/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type,
        method,
        status,
        statusText,
        url,
        message,
        eventType,
      }),
    });
  }

  const log: Log = {
    resource: process.env.NEXT_PUBLIC_SERVER_HOST,
    type,
    eventType,
  };

  if (method) log.method = method;
  if (status) log.status = status;
  if (statusText) log.statusText = statusText;
  if (url) log.url = url;
  if (message) log.message = message;
  if (messageObject) log.messageObject = messageObject;

  displayLog(log);
};

export const displayLog = async (...args: any[]) => {
  console.log(
    "\x1b[33m",
    `==== ${moment().format("MMMM Do YYYY, HH:mm:ss.SSS")} ====`,
    "\x1b[0m"
  );
  console.dir(...args, { depth: 5 });
  console.log("\x1b[33m", "=============== END_LOG ===============", "\x1b[0m");
  console.log("\n");
};
