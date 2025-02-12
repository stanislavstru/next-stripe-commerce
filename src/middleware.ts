import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

const BLOCKED_COUNTRIES = [
  "RU",
  "BY",
  "KZ",
  "AM",
  "KG",
  "MD",
  "TJ",
  "TM",
  "UZ",
  "AZ",
];

export function middleware(request: NextRequest) {
  const { country } = geolocation(request);

  if (
    process.env.REDIRECT_FOR_SOME_REGIONS &&
    country &&
    BLOCKED_COUNTRIES.includes(country)
  ) {
    return NextResponse.redirect(process.env.REDIRECT_FOR_SOME_REGIONS);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
