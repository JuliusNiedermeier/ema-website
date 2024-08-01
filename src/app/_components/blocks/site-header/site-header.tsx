import { ComponentProps, FC } from "react";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Label } from "~/app/_components/primitives/typography";
import { OffersMenu } from "./menus/programs-menu";
import {
  NavigationMenu,
  NavigationMenuBackdrop,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuViewport,
  NavigationMenuMobileMenuItem,
} from "./navigation-menu";
import { AboutMenu } from "./menus/about-menu";
import { MobileMenu } from "./menus/mobile-menu";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { SiteHeaderQueryResult } from "../../../../../generated/sanity/types";

const siteHeaderQuery = groq`*[_type == "header-config"][0]`;

export type SiteHeaderProps = ComponentProps<"header"> & {};

export const SiteHeader: FC<SiteHeaderProps> = async ({ className, ...restProps }) => {
  const headerConfig = await sanityFetch<SiteHeaderQueryResult>(siteHeaderQuery, { tags: ["header-config"] });

  return (
    <NavigationMenu>
      <NavigationMenuBackdrop />
      <header className={cn("border-b border-[gray]/20 bg-neutral-200/90 backdrop-blur-3xl", className)} {...restProps}>
        <Container className="py-3x">
          <nav className="flex h-16 items-stretch gap-8">
            <Link href="/" className="mr-auto self-center">
              <SiteLogo />
            </Link>

            <NavigationMenuList className="text-sm flex h-full items-stretch font-medium">
              <div className="hidden md:contents">
                <NavigationMenuItem label={headerConfig?.navLinks?.home || ""} href="/" exact />
                <NavigationMenuItem
                  label={headerConfig?.navLinks?.about || ""}
                  href="/about"
                  menuContent={<AboutMenu className="max-h-[70vh] overflow-y-auto" />}
                />
                <NavigationMenuItem
                  label={headerConfig?.navLinks?.educationalProgramTypes || ""}
                  href="/bildungswege"
                  menuContent={<OffersMenu className="max-h-[70vh] overflow-y-auto" />}
                />
                <NavigationMenuItem label={headerConfig?.navLinks?.blog || ""} href="/blog" />
                <NavigationMenuItem label={headerConfig?.navLinks?.contact || ""} href="/kontakt" />

                <Button
                  href="/go"
                  size="sm"
                  vairant="outline"
                  className="ml-8 self-center transition-[padding] hover:pr-1"
                >
                  <Label>{headerConfig?.CTALabel || ""}</Label>
                  <ButtonInteractionBubble />
                </Button>
              </div>

              <NavigationMenuMobileMenuItem className="self-center md:hidden">
                <MobileMenu />
              </NavigationMenuMobileMenuItem>

              <NavigationMenuIndicator className="text-center transition-transform">
                <div className="mx-auto h-4 w-4 -translate-y-[calc(50%-1px)] rotate-45 rounded-tl border border-[gray]/30 bg-neutral-200" />
              </NavigationMenuIndicator>
            </NavigationMenuList>
          </nav>
        </Container>

        <div className="absolute bottom-0 w-full translate-y-[calc(100%+1px)] overflow-hidden rounded-b-3xl sm:block">
          <NavigationMenuViewport className="z-10 h-[var(--radix-navigation-menu-viewport-height)] bg-neutral-200 transition-all data-[state='closed']:animate-contractUp data-[state='open']:animate-expandDown" />
        </div>
      </header>
    </NavigationMenu>
  );
};
