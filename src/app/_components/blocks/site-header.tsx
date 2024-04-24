"use client";

import { ComponentProps, FC, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { SiteLogo } from "../compounds/site-logo";
import Link from "next/link";
import { Hamburger } from "../compounds/hamburger";

export type SiteHeaderProps = ComponentProps<"header"> & {};

export const SiteHeader: FC<SiteHeaderProps> = ({ className, ...restProps }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={cn("bg-neutral-200/90 backdrop-blur-3xl border-b border-[gray]/20", className)} {...restProps}>
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <SiteLogo />
          </Link>
          <Hamburger open={menuOpen} onOpenChange={setMenuOpen} className="md:hiddenx" />
        </div>
      </Container>
    </header>
  );
};
