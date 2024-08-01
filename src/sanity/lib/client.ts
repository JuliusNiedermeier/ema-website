import "server-only";

import { createClient, QueryOptions, QueryParams } from "next-sanity";
import { env } from "~/env";
import { apiVersion } from "~/sanity/config";
import { draftMode } from "next/headers";

export const sanity = createClient({
  apiVersion,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

export const sanityFetch = async <QueryResponse>(query: string, tags: string[] = [], params: QueryParams = {}) => {
  const isDraftMode = draftMode().isEnabled;

  const queryOptions: QueryOptions = {
    token: isDraftMode ? env.SANITY_READ_TOKEN : undefined,
    perspective: isDraftMode ? "previewDrafts" : undefined,
    stega: isDraftMode,
    next: {
      revalidate: isDraftMode ? 0 : undefined, // Do not cache if in draft mode
      tags,
    },
  };

  return sanity.fetch<QueryResponse>(query, params, queryOptions);
};
