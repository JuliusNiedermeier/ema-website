import type { Metadata } from "next";

import "~/app/_styles/globals.css";
import "~/app/_styles/font-faces.css";

export const metadata: Metadata = {
  title: "Emil Molt Akademie",
  description: "Wirtschaft verstehen. Sozial handeln.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
