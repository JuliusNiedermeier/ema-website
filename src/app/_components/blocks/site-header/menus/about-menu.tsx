import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { Card } from "~/app/_components/primitives/card";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";

export type AboutMenuProps = ComponentProps<"div"> & {};

export const AboutMenu: FC<AboutMenuProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn(className)} {...restProps}>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 py-4">
        <Card className="group rounded-3xl border p-2">
          <div className="p-6">
            <Heading size="sm">Wirtschaft & Soziales</Heading>
            <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/economy-x-social.png"
              alt="Wirtschaft & Soziales"
              width="500"
              height="500"
              className="h-full w-full object-cover"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Card>
        <Card className="group rounded-3xl border p-2">
          <div className="p-6">
            <Heading size="sm">Dein Campus</Heading>
            <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/checkup-card.png"
              alt="Wirtschaft & Soziales"
              width="500"
              height="500"
              className="h-full w-full object-cover"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Card>
        <Card className="group rounded-3xl border p-2">
          <div className="p-6">
            <Heading size="sm">Über uns</Heading>
            <Paragraph>Lorem ipsum dolor sit amet consectetur adipisicing elit.</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src="/checkup-card.png"
              alt="Wirtschaft & Soziales"
              width="500"
              height="500"
              className="h-full w-full object-cover"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Card>
      </Container>
    </div>
  );
};
