import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button } from "../primitives/button";
import { InteractionBubble } from "./interaction-bubble";
import Image from "next/image";

export type GenericCTAProps = ComponentProps<typeof Card> & {
  preHeading: string;
  mainheading: string;
  paragraph: string;
  ctaText: string;
  imageURL: string;
};

export const GenericCTA: FC<GenericCTAProps> = ({
  className,
  preHeading,
  mainheading,
  paragraph,
  ctaText,
  imageURL,
  ...restProps
}) => {
  return (
    <Card
      className={cn(
        "relative flex flex-col items-stretch gap-8 overflow-hidden rounded-3xl bg-primary-900 p-2 text-neutral-900-text md:flex-row-reverse md:p-8",
        className,
      )}
      {...restProps}
    >
      <div className="max-w-[40rem] flex-[2] p-6 md:p-0">
        <div className="flex items-center gap-4 text-neutral-900-text">
          <div className="h-px w-8 bg-neutral-900-text" />
          <Heading size="sm">{preHeading}</Heading>
        </div>
        <Heading className="mt-8 text-primary-900-text">{mainheading}</Heading>
        <Paragraph className="text-neutral-900-text">{paragraph}</Paragraph>
        <Button vairant="filled" className="mt-12 gap-6 bg-primary-100 pr-4 text-primary-100-text">
          <Label>{ctaText}</Label>
          <InteractionBubble animated={false} />
        </Button>
      </div>
      <div className="aspect-square h-36 flex-1 md:aspect-auto md:h-auto">
        <Image
          src={imageURL}
          alt={mainheading}
          height="500"
          width="500"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>
    </Card>
  );
};
