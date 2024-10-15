import { Metadata } from "next";
import { sanityFetch } from "~/sanity/lib/client";

export const createGenerateMetadata = <T extends Metadata | null>(...args: Parameters<typeof sanityFetch>) => {
  return async (): Promise<Metadata> => {
    const data = await sanityFetch<T>(...args);
    return data || {};
  };
};
