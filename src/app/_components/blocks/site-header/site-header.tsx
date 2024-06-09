import { ComponentProps, FC } from "react";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Label } from "~/app/_components/primitives/typography";
import { OffersMenu } from "./offers-menu";
import { NavigationItem } from "./navigation-item";
import { SiteHeaderContextProvider } from "./site-header-context";
import { MenuBackdrop, MenuShell } from "./menu-shell";
import { SiteHeaderHamburger } from "./hamburger";

export type SiteHeaderProps = ComponentProps<"header"> & {};

export const SiteHeader: FC<SiteHeaderProps> = ({ className, ...restProps }) => {
  return (
    <SiteHeaderContextProvider>
      <MenuBackdrop />
      <header className={cn("border-b border-[gray]/20 bg-neutral-200/90 backdrop-blur-3xl", className)} {...restProps}>
        <Container className="py-3">
          <div className="flex items-center justify-between">
            <Link href="/">
              <SiteLogo />
            </Link>

            <nav className="text-sm hidden items-center gap-8 font-medium md:flex">
              <NavigationItem href="/" label="Akademie" exact />
              <NavigationItem href="/bildungswege" label="Bildungswege" menu />
              <NavigationItem href="/blog" label="Blog" />
              <Button href="/go" size="sm" vairant="outline">
                <Label>Bewerben</Label>
                <ButtonInteractionBubble />
              </Button>
            </nav>

            <SiteHeaderHamburger className="md:hidden" />
          </div>
        </Container>
        <div className="relative w-full translate-y-px sm:block">
          <MenuShell>
            <OffersMenu />
          </MenuShell>
        </div>
      </header>
    </SiteHeaderContextProvider>
  );
};
