import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { sanityFetch } from "./sanity/lib/client";
import { groq } from "next-sanity";
import { MiddlewareRedirectsQueryResult } from "../generated/sanity/types";

const middlewareRedirectsQuery = groq`*[_type == "redirect-settings"][0]`;

export async function middleware(request: NextRequest) {
  try {
    const redirectSettings = await sanityFetch<MiddlewareRedirectsQueryResult>(middlewareRedirectsQuery, {
      tags: ["redirect-settings"],
    });

    const path = request.nextUrl.pathname;

    const redirect = redirectSettings?.redirects?.find((redirect) => redirect.source === path);

    if (redirect) {
      const url = new URL(redirect.destination || "", request.url);
      return NextResponse.redirect(url, {
        status: redirect.permanent ? 301 : 302,
      });
    }
  } catch (error) {
    console.error("Error in redirect middleware:", error);
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
