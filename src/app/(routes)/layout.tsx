import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { cn } from "~/app/_utils/cn";
import { catamaran, tiempos } from "~/app/_fonts/fonts";

import "~/app/_styles/globals.css";
import "~/app/_styles/theme.css";
import { QueryProvider } from "../_components/primitives/query-provider";

export const metadata: Metadata = {
  title: "Emil Molt Akademie",
  description: "Wirtschaft verstehen. Sozial handeln.",
  robots: { index: false },
};

const PublicLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryProvider>
      <html lang="de">
        <body
          className={cn(
            catamaran.variable,
            tiempos.variable,
            "overflow-x-hidden bg-neutral-100 font-sans text-neutral-200-text",
          )}
        >
          {children}
        </body>
      </html>
    </QueryProvider>
  );
};

export default PublicLayout;
