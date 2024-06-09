import { ComponentProps, FC } from "react";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import { Card } from "~/app/_components/primitives/card";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { OffersGrid } from "../../compounds/offers-grid";

export type OffersMenuProps = ComponentProps<typeof Container> & {};

export const OffersMenu: FC<OffersMenuProps> = ({ className, ...restProps }) => {
  return (
    <Container
      className={cn("flex flex-col-reverse gap-4 border-t border-[gray]/20 py-4 sm:items-end xl:flex-row", className)}
      {...restProps}
    >
      <Card className="w-full bg-primary-900 text-neutral-900-text xl:max-w-96" data-animate>
        <Heading size="sm">Finde heraus was zu Dir passt.</Heading>
        <Paragraph className="text-neutral-900-text-muted">
          Mit unserem Checkup tool findest du garantiert die perfekte Ausbildung für Dich!
        </Paragraph>
        <Button vairant="outline" size="sm" className="mt-8" href="/checkup">
          <Label>Jetzt testen</Label>
          <InteractionBubble />
        </Button>
      </Card>

      <OffersGrid />

      <div className="sm:hidden">
        <div className="text-right">
          <Link href="/">
            <Heading size="lg" tag="h3" data-animate className="!duration-300">
              Home
            </Heading>
          </Link>
          <Link href="/blog">
            <Heading size="lg" tag="h3" data-animate className="!duration-150">
              Blog
            </Heading>
          </Link>
        </div>
        <div className="my-8 h-px bg-neutral-400"></div>
        <Heading size="lg" tag="h3" data-animate className="!duration-100">
          Bildungswege
        </Heading>
      </div>
    </Container>
  );
};
