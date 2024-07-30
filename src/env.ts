import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SANITY_REVALIDATION_WEBHOOK_SECRET: z.string(),
    POSTGRES_CONNECTION_STRING: z.string(),
    RESEND_API_KEY: z.string(),
    RESEND_SENDER_ADDRESS: z.string().email(),
    RESEND_PUBLIC_SENDER_NAME: z.string(),
    RESEND_INTERNAL_RECIPIENT_ADDRESS: z.string().email(),
    TURNSTILE_SECRET_KEY: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_SITE_URL: z.string(),
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
    NEXT_PUBLIC_SANITY_DATASET: z.string(),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,

    SANITY_REVALIDATION_WEBHOOK_SECRET: process.env.SANITY_REVALIDATION_WEBHOOK_SECRET,
    POSTGRES_CONNECTION_STRING: process.env.POSTGRES_CONNECTION_STRING,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_SENDER_ADDRESS: process.env.RESEND_SENDER_ADDRESS,
    RESEND_PUBLIC_SENDER_NAME: process.env.RESEND_PUBLIC_SENDER_NAME,
    RESEND_INTERNAL_RECIPIENT_ADDRESS: process.env.RESEND_INTERNAL_RECIPIENT_ADDRESS,
    TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
  },
});
