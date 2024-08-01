import "server-only";

import { createClient, QueryOptions, QueryParams } from "next-sanity";
import { env } from "~/env";
import { apiVersion } from "~/sanity/config";
import { draftMode as checkDraftMode } from "next/headers";

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

type SanityFetchOptions = {
  tags?: string[];
  params?: QueryParams;
  draftMode?: boolean;
};

export const sanityFetch = async <QueryResponse>(query: string, options: SanityFetchOptions = {}) => {
  const { tags = [], params = {}, draftMode } = options;

  let isDraftMode = draftMode;

  if (typeof isDraftMode === "undefined") {
    try {
      isDraftMode = checkDraftMode().isEnabled;
    } catch {
      throw new Error(
        "sanityFetch was called outside a request scope. Make sure the function is called within a Server Component, Server Action, or Route Handler, or that the 'draftMode' option is set to 'true' or 'false'.",
      );
    }
  }

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
