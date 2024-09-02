import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { OffersMenu } from "./programs-menu";
import { AboutMenu } from "./about-menu";
import { Container } from "~/app/_components/primitives/container";
import Link from "next/link";
import { Heading } from "~/app/_components/primitives/typography";

export type MobileMenuProps = ComponentProps<"div"> & {};

export const MobileMenu: FC<MobileMenuProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("max-h-[75vh] overflow-y-auto overflow-x-hidden", className)} {...restProps}>
      <Container className="mt-16 text-center">
        <Link href="/">
          <Heading size="lg" tag="h3">
            Home
          </Heading>
        </Link>
        <Link href="/blog/all">
          <Heading size="lg" tag="h3">
            Blog
          </Heading>
        </Link>
        <Link href="/kontakt">
          <Heading size="lg" tag="h3">
            Kontakt
          </Heading>
        </Link>
      </Container>

      <Seperator label="About" className="mt-16" />

      <AboutMenu />

      <Seperator label="Bildungswege" className="mt-16" />

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
