import { FC, PropsWithChildren } from "react";

const StudioLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="de">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
};

export default StudioLayout;
