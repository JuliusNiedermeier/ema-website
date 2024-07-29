import { FC, PropsWithChildren } from "react";
import { CookieNotice } from "~/app/_components/blocks/cookie-notice";
import { SiteFooter } from "~/app/_components/blocks/site-footer";
import { SiteHeader } from "~/app/_components/blocks/site-header/site-header";
import { CookieNoticeRoot } from "~/app/_components/compounds/cookie-notice/cookie-notice";

const PublicDefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="sticky top-0 z-50">
        <SiteHeader />
      </div>
      {children}
      <SiteFooter />
      <CookieNoticeRoot>
        <CookieNotice />
      </CookieNoticeRoot>
    </>
  );
};

export default PublicDefaultLayout;
