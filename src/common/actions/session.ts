"use server";

import { SessionData, sessionOptions } from "@/utils/iron-session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// Get session data from cookies
export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  return session;
}

export async function setSession(data: Partial<SessionData["data"]>) {
  const session = await getSession();

  session.data = { ...session.data, ...data };
  await session.save();
}

// Logout
export async function getLogout() {
  const session = await getSession();
  await session.destroy();
}
