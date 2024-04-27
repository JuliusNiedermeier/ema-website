import { createClient } from "next-sanity";
import { env } from "~/env";
import { apiVersion } from "~/sanity/config";

export const sanity = createClient({
  apiVersion,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
});
