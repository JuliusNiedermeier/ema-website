import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button } from "../primitives/button";
import { InteractionBubble } from "./interaction-bubble";

export type GenericCTAProps = ComponentProps<"div"> & {
  preHeading: string;
  mainheading: string;
  paragraph: string;
  ctaText: string;
};

export const GenericCTA: FC<GenericCTAProps> = ({
  className,
  preHeading,
  mainheading,
  paragraph,
  ctaText,
  ...restProps
}) => {
  return (
    <div className={cn("mt-32 rounded-3xl border p-2", className)} {...restProps}>
      <Card className="relative overflow-hidden bg-primary-900 text-neutral-900-text">
        <div className="max-w-[40rem]">
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
        {Array.from(new Array(10)).map((_, index) => (
          <div
            className="absolute right-0 top-0 aspect-square h-full origin-top-right rounded-bl-full bg-primary-100"
            style={{ scale: index * 0.2, opacity: 0.02 }}
          />
        ))}
      </Card>
    </div>
  );
};
