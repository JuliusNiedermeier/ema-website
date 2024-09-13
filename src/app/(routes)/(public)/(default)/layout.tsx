import { FC, PropsWithChildren } from "react";
import { CookieNotice } from "~/app/_components/blocks/cookie-notice";
import { SiteFooter } from "~/app/_components/blocks/site-footer";
import { SiteHeader } from "~/app/_components/blocks/site-header/site-header";
import { CookieNoticeRoot } from "~/app/_components/compounds/cookie-notice/cookie-notice";

const PublicDefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <SiteHeader className="fixed left-0 right-0 top-10 z-50" />
      {children}
      <SiteFooter />
      <CookieNoticeRoot>
        <CookieNotice />
      </CookieNoticeRoot>
    </>
  );
};

export default PublicDefaultLayout;
