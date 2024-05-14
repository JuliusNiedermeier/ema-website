import { FC, PropsWithChildren } from "react";
import { SiteHeader } from "~/app/_components/blocks/site-header/site-header";

const PublicDefaultLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="sticky top-0 z-10">
        <SiteHeader />
      </div>
      {children}
    </>
  );
};

export default PublicDefaultLayout;
