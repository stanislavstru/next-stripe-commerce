import { type NextRequest } from "next/server";
import { getSession } from "@/common/actions/session";
import { NextResponse } from "next/server";
import { AuthResponseDto } from "@/common/types/api/types-from-swagger";

export async function GET(request: NextRequest) {
  const session = await getSession();

  console.log("session", session);
  const searchParams = request.nextUrl.searchParams;

  const accessToken = searchParams.get("access_token");
  const roles = searchParams.get("roles");

  if (accessToken && roles) {
    session.data = {
      access_token: accessToken,
      roles: roles.split(",") as AuthResponseDto["roles"],
    };
    await session.save();
  }

  return NextResponse.redirect(process.env.CLIENT_HOST as string);
}
