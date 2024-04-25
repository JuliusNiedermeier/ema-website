"use client";

import { ComponentProps, FC, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import { Hamburger } from "~/app/_components/compounds/hamburger";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { Button } from "~/app/_components/primitives/button";
import { Label } from "~/app/_components/primitives/typography";
import { OffersMenu } from "./offers-menu";

export type SiteHeaderProps = ComponentProps<"header"> & {};

export const SiteHeader: FC<SiteHeaderProps> = ({ className, ...restProps }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => setMenuOpen(false), [pathName]);

  return (
    <header className={cn("border-b border-[gray]/20 bg-neutral-200/90 backdrop-blur-3xl", className)} {...restProps}>
      <Container className="py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <SiteLogo />
          </Link>

          <nav className="text-sm hidden items-center gap-8 font-medium md:flex">
            <NavigationItem href="/" label="Akademie" exact />
            <NavigationItem href="/bildungswege" label="Bildungswege" menu onClick={() => setMenuOpen(!menuOpen)} />
            <NavigationItem href="/blog" label="Blog" exact />
            <Button href="/go" size="sm" vairant="outline">
              <Label className="py-6">Bewerben</Label>
              <InteractionBubble className="group-hover:ml-4" />
            </Button>
          </nav>

          <Hamburger open={menuOpen} onOpenChange={setMenuOpen} className="md:hidden" />
        </div>
      </Container>
      <div className="hiddenx relative w-full sm:block">
        <div
          className={cn(
            "absolute left-0 top-0 max-h-[80vh] w-full overflow-y-auto overflow-x-hidden rounded-b-2xl bg-neutral-200 sm:overflow-y-hidden",
            "transition-[clip-path]",
            "[&[data-menu=closed]_[data-animate]]:translate-y-8 [&_[data-animate]]:transition-transform",
          )}
          style={{ clipPath: menuOpen ? "rect(0 100% 100% 0)" : "rect(0 100% 0 0)" }}
        >
          <OffersMenu />
        </div>
      </div>
    </header>
  );
};

type NavigationItemProps = {
  href: string;
  label: string;
  exact?: boolean;
  menu?: boolean;
  onClick?: () => any;
};

const NavigationItem: FC<NavigationItemProps> = ({ href, label, exact, onClick, menu }) => {
  const pathName = usePathname();

  const active = exact ? pathName === href : pathName.startsWith(href);

  const Component = menu ? "button" : Link;

  return (
    <Component href={href} onClick={onClick} className={cn("group relative flex cursor-pointer items-center")}>
      <div
        className={cn(
          "h-1 w-1 rounded-full bg-neutral-900",
          "transition-all",
          "absolute -left-3 top-1/2 -translate-y-1/2 opacity-100",
          {
            "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-20 group-active:w-2": !active,
          },
        )}
      />
      <Label>{label}</Label>
    </Component>
  );
};
