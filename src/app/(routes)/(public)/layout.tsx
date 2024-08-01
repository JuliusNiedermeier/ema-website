import { FC, PropsWithChildren } from "react";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { PublicLayoutQueryResult } from "../../../../generated/sanity/types";
import { GoogleTagManager } from "~/app/_components/compounds/GoogleTagManager";

const publicLayoutQuery = groq`*[_type == "website-settings"][0]{
    gtmID
}`;

const PublicLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanityFetch<PublicLayoutQueryResult>(publicLayoutQuery, { tags: ["website-settings"] });

  return (
    <>
      <GoogleTagManager gtmID={data?.gtmID || ""} />
      {children}
    </>
  );
};

export default PublicLayout;
