import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import Link from "next/link";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import { Label } from "~/app/_components/primitives/typography";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { ApplicationPageFooterQueryResult } from "../../../../../../generated/sanity/types";

const applicationPageFooterQuery = groq`*[_type == "footer-config"][0]{
  copyrightNotice,
  legalLinks
}`;

export type GoLayoutHeaderProps = Omit<ComponentProps<"header">, "children"> & {
  title: string;
};

export const GoLayoutHeader: FC<GoLayoutHeaderProps> = ({ className, title, ...restProps }) => {
  return (
    <header
      className={cn("sticky top-0 z-20 border-b border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg", className)}
      {...restProps}
    >
      <Container width="narrow" className="flex items-center justify-between gap-2 py-4 lg:py-4">
        <Link href="/" className="rounded-full bg-neutral-200/60 px-4 py-2 backdrop-blur-lg">
          <SiteLogo show="text" />
        </Link>
        <Label>{title}</Label>
      </Container>
    </header>
  );
};

export type GoLayoutFooterProps = ComponentProps<"footer"> & {};

export const GoLayoutFooter: FC<GoLayoutFooterProps> = async ({ className, children, ...restProps }) => {
  const data = await sanity.fetch<ApplicationPageFooterQueryResult>(
    applicationPageFooterQuery,
    {},
    { next: { tags: ["footer-config"] } },
  );
  return (
    <footer
      className={cn("sticky bottom-0 z-20 border-t border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg", className)}
      {...restProps}
    >
      <Container width="narrow" className="relative flex flex-col gap-4 py-4">
        {children}
        <div className="flex items-center justify-center gap-4 opacity-50">
          <Link href="/datenschutz">
            <Label>{data?.legalLinks?.privacy}</Label>
          </Link>
          <Link href="/impressum">
            <Label>{data?.legalLinks?.impressum}</Label>
          </Link>
        </div>
      </Container>
    </footer>
  );
};
