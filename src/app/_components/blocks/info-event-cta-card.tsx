import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { InfoEventCTACardQueryResult } from "../../../../generated/sanity/types";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { EventDateList } from "../compounds/event-date-list";

const infoEventCTACardQuery = groq`*[_type == "info-event-page"][0] {
  preview,
  nextDates,
  timeSuffix
}`;

export type InfoEventCTACardProps = ComponentProps<typeof Card> & {
  stack?: boolean;
};

export const InfoEventCTACard: FC<InfoEventCTACardProps> = async ({ className, stack = false, ...restProps }) => {
  const data = await sanityFetch<InfoEventCTACardQueryResult>(infoEventCTACardQuery, { tags: ["info-event-page"] });

  return (
    <Card
      className={cn(
        "group flex flex-col gap-8 rounded-3xl border border-neutral-400 bg-neutral-300 p-4",
        { "md:flex-row": !stack },
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 p-4">
        <Heading size="lg" tag="h3" className="mt-3">
          {data?.preview?.title}
        </Heading>
        <Paragraph className="mt-8">{data?.preview?.description}</Paragraph>
        <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
          <InteractionBubble />
          <Label>{data?.preview?.readMoreLabel}</Label>
        </div>
      </div>
      <EventDateList
        timeSuffix={data?.timeSuffix || ""}
        dates={data?.nextDates?.map((date) => new Date(date.eventDate || "")) || []}
      />
    </Card>
  );
};