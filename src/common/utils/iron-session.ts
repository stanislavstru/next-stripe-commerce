import { SessionOptions } from "iron-session";
import { AuthResponseDto } from "../types/api/types-from-swagger";

export interface SessionObject {
  access_token?: string;
  roles: AuthResponseDto["roles"];
  // userAgent?: string;
}

export interface SessionData {
  data: SessionObject;
}

export const defaultSession: SessionData = {
  data: {
    access_token: undefined,
    roles: [],
  },
};

export const sessionOptions: SessionOptions = {
  password: process.env.COOKIE_SECRET_PASSWORD as string,
  cookieName: process.env.COOKIE_NAME as string,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
