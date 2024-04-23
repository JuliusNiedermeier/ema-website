import type { Metadata } from "next";

import "~/app/_styles/globals.css";
import "~/app/_styles/font-faces.css";
import { FC, PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Emil Molt Akademie",
  description: "Wirtschaft verstehen. Sozial handeln.",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
