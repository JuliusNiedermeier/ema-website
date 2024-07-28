import type { Metadata } from "next";
import { FC, PropsWithChildren } from "react";
import { cn } from "~/app/_utils/cn";
import { catamaran, tiempos } from "~/app/_fonts/fonts";

import "~/app/_styles/globals.css";
import "~/app/_styles/theme.css";
import { QueryProvider } from "../_components/primitives/query-provider";
import { Container } from "../_components/primitives/container";
import { CookieNotice } from "../_components/compounds/cookie-notice/cookie-notice";

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
          <div className="fixed bottom-0 left-0 w-full">
            <Container className="flex justify-end">
              <CookieNotice className="mb-2 lg:mb-8" />
            </Container>
          </div>
        </body>
      </html>
    </QueryProvider>
  );
};

export default PublicLayout;
