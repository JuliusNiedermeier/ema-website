import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
  NEXT_PUBLIC_SANITY_DATASET: z.string(),
  SANITY_REVALIDATION_WEBHOOK_SECRET: z.string(),
});

export const env = envSchema.parse(process.env);
