import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { cn } from "../_utils/cn";
import { catamaran, tiempos } from "~/app/_fonts/fonts";

import "~/app/_styles/globals.css";
import "~/app/_styles/theme.css";

export const metadata: Metadata = {
  title: "Emil Molt Akademie",
  description: "Wirtschaft verstehen. Sozial handeln.",
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="de">
      <body
        className={cn(
          catamaran.variable,
          tiempos.variable,
          "font-sans bg-neutral-100 text-neutral-200-text overflow-x-hidden",
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
