import { FC, PropsWithChildren } from "react";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { PublicLayoutQueryResult } from "../../../../generated/sanity/types";
import { GoogleTagManager } from "~/app/_components/compounds/GoogleTagManager";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { LeavePreviewModeButton } from "~/app/_components/compounds/leave-preview-mode-button";
import { CookieNoticeRoot } from "~/app/_components/compounds/cookie-notice/cookie-notice";
import { CookieNotice } from "~/app/_components/blocks/cookie-notice";

const publicLayoutQuery = groq`*[_type == "website-settings"][0]{
    gtmID
}`;

const PublicLayout: FC<PropsWithChildren> = async ({ children }) => {
  const data = await sanityFetch<PublicLayoutQueryResult>(publicLayoutQuery, { tags: ["website-settings"] });

  return (
    <>
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
    </>
  );
};

export default PublicLayout;
