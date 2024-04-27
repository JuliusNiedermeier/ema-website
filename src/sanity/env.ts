export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-04-25";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
);

export const hookSecret = assertValue(
  process.env.SANITY_REVALIDATION_WEBHOOK_SECRET,
  "Missing environment variable: SANITY_REVALIDATION_WEBHOOK_SECRET",
);

export const useCdn = false;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
