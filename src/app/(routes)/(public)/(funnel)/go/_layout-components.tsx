import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import Link from "next/link";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import { Label } from "~/app/_components/primitives/typography";

export type GoLayoutHeaderProps = Omit<ComponentProps<"header">, "children"> & {};

export const GoLayoutHeader: FC<GoLayoutHeaderProps> = ({ className, ...restProps }) => {
  return (
    <header
      className={cn("sticky top-0 z-20 border-b border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg", className)}
      {...restProps}
    >
      <Container width="narrow" className="flex items-center justify-between gap-2 py-4 lg:py-4">
        <Link href="/" className="rounded-full bg-neutral-200/60 px-4 py-2 backdrop-blur-lg">
          <SiteLogo show="text" />
        </Link>
        <Label>Online-Anmeldung</Label>
      </Container>
    </header>
  );
};

export type GoLayoutFooterProps = ComponentProps<"footer"> & {};

export const GoLayoutFooter: FC<GoLayoutFooterProps> = ({ className, children, ...restProps }) => {
  return (
    <footer
      className={cn("sticky bottom-0 z-20 border-t border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg", className)}
      {...restProps}
    >
      <Container width="narrow" className="relative flex flex-col gap-4 py-4">
        {children}
        <div className="flex items-center justify-center gap-4 opacity-50">
          <Label>Datenschutz</Label>
          <Label>Impressum</Label>
          <Label>AGBs</Label>
        </div>
      </Container>
    </footer>
  );
};
