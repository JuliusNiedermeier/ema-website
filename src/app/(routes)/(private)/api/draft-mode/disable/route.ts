import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export function GET(request: NextRequest) {
  draftMode().disable();
  const redirectPathname = new URL(request.url).searchParams.get("redirect");
  return NextResponse.redirect(new URL(redirectPathname || "/", request.url));
}
