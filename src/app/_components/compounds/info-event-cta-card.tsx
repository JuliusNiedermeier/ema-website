import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { InteractionBubble } from "./interaction-bubble";
import { EventDateList } from "./event-date-list";

export type InfoEventCTACardProps = ComponentProps<typeof Card> & {
  heading: string;
  description: string;
  readMoreLabel: string;
  dates: Date[];
  timeSuffix: string;
};

export const InfoEventCTACard: FC<InfoEventCTACardProps> = ({
  className,
  heading,
  description,
  dates,
  readMoreLabel,
  timeSuffix,
  ...restProps
}) => {
  return (
    <Card
      className={cn(
        "group flex flex-col gap-8 rounded-3xl border border-neutral-400 bg-neutral-300 p-4 md:flex-row",
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 p-4">
        <Heading size="lg" tag="h3" className="mt-3">
          {heading}
        </Heading>
        <Paragraph className="mt-8">{description}</Paragraph>
        <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
          <InteractionBubble />
          <Label>{readMoreLabel}</Label>
        </div>
      </div>
      <EventDateList timeSuffix={timeSuffix} dates={dates} />
    </Card>
  );
};
