import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "~/app/_styles/globals.css";
import "~/app/_styles/font-faces.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emil Molt Akademie",
  description: "Wirtschaft verstehen. Sozial handeln.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
