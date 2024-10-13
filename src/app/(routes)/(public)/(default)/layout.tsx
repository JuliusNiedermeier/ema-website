import { groq } from "next-sanity";
import { FC, PropsWithChildren } from "react";
import { SiteFooter } from "~/app/_components/blocks/site-footer";
import { SiteHeader } from "~/app/_components/blocks/site-header/site-header";
import { NewsBanner } from "~/app/_components/compounds/news-banner/news-banner";
import { SiteHeaderContainer } from "~/app/_components/compounds/site-header-container";
import { sanityFetch } from "~/sanity/lib/client";
import { PublicDefaultLayoutInfoBannerQueryResult } from "../../../../../generated/sanity/types";

const publicDefaultLayoutInfoBannerQuery = groq`*[_type == "info-banner-component"][0]`;

const PublicDefaultLayout: FC<PropsWithChildren> = async ({ children }) => {
  const infoBanner = await sanityFetch<PublicDefaultLayoutInfoBannerQueryResult>(publicDefaultLayoutInfoBannerQuery, {
    tags: ["info-banner-component"],
  });

  return (
    <>
      {infoBanner && (
        <NewsBanner
          className="sticky top-0 z-40"
          text={infoBanner.content || ""}
          link={infoBanner.link || "/"}
          updatedAt={new Date(infoBanner._updatedAt)}
        />
      )}
      <SiteHeaderContainer isNewsBannerEnabled={Boolean(infoBanner)}>
        <SiteHeader className="relative z-50" />
      </SiteHeaderContainer>
      {children}
      <SiteFooter />
    </>
  );
};

export default PublicDefaultLayout;
