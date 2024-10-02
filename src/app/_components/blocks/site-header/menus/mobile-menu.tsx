import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { OffersMenu } from "./programs-menu";
import { AboutMenu } from "./about-menu";
import Link from "next/link";
import { Heading } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { siteHeaderQuery } from "../site-header";
import { SiteHeaderQueryResult } from "../../../../../../generated/sanity/types";

export type MobileMenuProps = ComponentProps<"div"> & {};

export const MobileMenu: FC<MobileMenuProps> = async ({ className, ...restProps }) => {
  const siteHeader = await sanityFetch<SiteHeaderQueryResult>(siteHeaderQuery, { tags: ["header-config"] });

  return (
    <div className={cn("max-h-[75vh] overflow-y-auto overflow-x-hidden", className)} {...restProps}>
      <div className="mt-16 text-center">
        <Link href="/">
          <Heading size="lg" tag="h3">
            {siteHeader?.navLinks?.home}
          </Heading>
        </Link>
        <Link href="/blog/alle">
          <Heading size="lg" tag="h3">
            {siteHeader?.navLinks?.blog}
          </Heading>
        </Link>
        <Link href="/kontakt">
          <Heading size="lg" tag="h3">
            {siteHeader?.navLinks?.contact}
          </Heading>
        </Link>
      </div>

      <Seperator label={siteHeader?.navLinks?.about || ""} className="mt-16" />

      <AboutMenu />

      <Seperator label={siteHeader?.navLinks?.educationalProgramTypes || ""} className="mt-16" />

      <OffersMenu />
    </div>
  );
};

export type SeperatorProps = ComponentProps<"div"> & {
  label: string;
};

export const Seperator: FC<SeperatorProps> = ({ className, label, ...restProps }) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...restProps}>
      <div className="h-px flex-1 bg-[gray]/50" />
      <Heading size="sm">{label}</Heading>
      <div className="h-px flex-1 bg-[gray]/50" />
    </div>
  );
};
