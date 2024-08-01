import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { sanity } from "~/sanity/lib/client";
import { env } from "~/env";

const clientWithToken = sanity.withConfig({ token: env.SANITY_READ_TOKEN });

export async function GET(request: NextRequest) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(clientWithToken, request.url);

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
