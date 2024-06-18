import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { env } from "~/env";

export const POST = async (req: NextRequest) => {
  try {
    const { body, isValidSignature } = await parseBody<{ _type: string; slug?: string }>(
      req,
      env.SANITY_REVALIDATION_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401, statusText: "Invalid Signature" });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400, statusText: "Missing _type attribute" });
    }

    revalidateTag(body._type);

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
};
