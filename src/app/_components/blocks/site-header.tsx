"use client";

import { ComponentProps, FC, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { SiteLogo } from "../compounds/site-logo";
import Link from "next/link";
import { Hamburger } from "../compounds/hamburger";
import { Label } from "../primitives/typography";
import { usePathname } from "next/navigation";

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
          <nav className="hidden md:flex items-center gap-10 font-medium text-sm">
            <NavigationLink href="/" label="Home" exact />
            {/* <a data-offers-trigger className="group relative cursor-pointer">
              <InteractionDot />
              <Typography>Bildungswege</Typography>
            </a>
            <a href="/blog" className="group relative">
              <InteractionDot />
              <Typography>Blog</Typography>
            </a>
            <Button on="light" intent="tertiary-cta">
              <ButtonText>Bewerben</ButtonText> <ButtonArrow size="sm" />
            </Button> */}
          </nav>

          <Hamburger open={menuOpen} onOpenChange={setMenuOpen} className="md:hidden" />
        </div>
      </Container>
    </header>
  );
};

type NavigationLinkProps = {
  href: string;
  label: string;
  exact?: boolean;
};

const NavigationLink: FC<NavigationLinkProps> = ({ href, label, exact }) => {
  const pathName = usePathname();

  const active = exact ? pathName === href : pathName.startsWith(href);

  return (
    <Link href={href} className="group relative cursor-pointer">
      <Label>{label}</Label>
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 -bottom-1 h-1 w-1 rounded-full bg-neutral-200-text translate-y-1 opacity-0 transition",
          { "translate-y-0 opacity-1": active, "group-hover:opacity-20 group-hover:translate-y-0": !active },
        )}
      ></div>
    </Link>
  );
};
