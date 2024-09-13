import { FC, PropsWithChildren } from "react";
import { CookieNotice } from "~/app/_components/blocks/cookie-notice";
import { SiteFooter } from "~/app/_components/blocks/site-footer";
import { SiteHeader } from "~/app/_components/blocks/site-header/site-header";
import { CookieNoticeRoot } from "~/app/_components/compounds/cookie-notice/cookie-notice";
import { NewsBanner } from "~/app/_components/compounds/news-banner/news-banner";
import { SiteHeaderContainer } from "~/app/_components/compounds/site-header-container";

const PublicDefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <NewsBanner className="sticky top-0 z-40" />
      <SiteHeaderContainer>
        <SiteHeader className="relative z-50" />
      </SiteHeaderContainer>
      {children}
      <SiteFooter />
      <CookieNoticeRoot>
        <CookieNotice />
      </CookieNoticeRoot>
    </>
  );
};

export default PublicDefaultLayout;
