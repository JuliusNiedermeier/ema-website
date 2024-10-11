import { FC, PropsWithChildren } from "react";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  PublicLayoutSiteSettingsMetaQueryResult,
  PublicLayoutSiteSettingsQueryResult,
} from "../../../../generated/sanity/types";
import { GoogleTagManager } from "~/app/_components/compounds/GoogleTagManager";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { LeavePreviewModeButton } from "~/app/_components/compounds/leave-preview-mode-button";
import { OnPageNavigationChecker } from "~/app/_components/compounds/on-page-navigation-checker";
import { CookieNoticeRoot } from "~/app/_components/compounds/cookie-notice/cookie-notice";
import { CookieNotice } from "~/app/_components/blocks/cookie-notice";
import { Metadata } from "next";

const publicLayoutSiteSettingsMetaQuery = groq`*[_type == "website-settings"][0] {
  websiteTitle,
  websiteDescription,
  preventIndexing,
  favicon { asset -> { url } }
}`;

const publicLayoutSiteSettingsQuery = groq`*[_type == "website-settings"][0]{
    gtmID
}`;

export const generateMetadata = async (): Promise<Metadata> => {
  const siteSettings = await sanityFetch<PublicLayoutSiteSettingsMetaQueryResult>(publicLayoutSiteSettingsMetaQuery, {
    tags: ["website-settings"],
  });

  return {
    title: siteSettings?.websiteTitle,
    description: siteSettings?.websiteDescription,
    robots: { index: !siteSettings?.preventIndexing },
    icons: {
      icon: siteSettings?.favicon?.asset?.url || "",
    },
  };
};

const PublicLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanityFetch<PublicLayoutSiteSettingsQueryResult>(publicLayoutSiteSettingsQuery, {
    tags: ["website-settings"],
  });

  return (
    <OnPageNavigationChecker>
      <GoogleTagManager gtmID={data?.gtmID || ""} />

      {children}

      <CookieNoticeRoot>
        <CookieNotice />
      </CookieNoticeRoot>

      {draftMode().isEnabled && (
        <>
          <VisualEditing />
          <div className="pointer-events-none fixed bottom-0 left-0 right-0 flex justify-center pb-4">
            <LeavePreviewModeButton className="pointer-events-auto transition-colors hover:border-neutral-400" />
          </div>
        </>
      )}
    </OnPageNavigationChecker>
  );
};

export default PublicLayout;
