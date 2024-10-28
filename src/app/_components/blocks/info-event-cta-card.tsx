import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  InfoEventCTACardQueryResult,
  InfoEventCTAEventsQueryResult,
  InfoEventCTATimeSuffixQueryResult,
} from "../../../../generated/sanity/types";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { EventDateList } from "../compounds/event-date-list";

const infoEventCTACardQuery = groq`*[_type == "info-event-page"][0] {
  heading,
  teaser,
  readMoreLabel,
}`;

const infoEventCTAEventsQuery = groq`*[_type == "event" && showOnInfoEventPage == true && dateTime(date) >= dateTime(now())] | order(date asc) [0..2]`;

const infoEventCTATimeSuffixQuery = groq`*[_type == "website-settings"][0]{
  timeSuffix
}`;

export type InfoEventCTACardProps = ComponentProps<typeof Card> & {
  stack?: boolean;
};

export const InfoEventCTACard: FC<InfoEventCTACardProps> = async ({ className, stack = false, ...restProps }) => {
  const [data, events, websiteSettings] = await Promise.all([
    sanityFetch<InfoEventCTACardQueryResult>(infoEventCTACardQuery, { tags: ["info-event-page"] }),
    sanityFetch<InfoEventCTAEventsQueryResult>(infoEventCTAEventsQuery, { tags: ["event"] }),
    sanityFetch<InfoEventCTATimeSuffixQueryResult>(infoEventCTATimeSuffixQuery, { tags: ["website-settings"] }),
  ]);

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
          {data?.heading}
        </Heading>
        <Paragraph className="mt-8">{data?.teaser}</Paragraph>
        <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
          <InteractionBubble />
          <Label>{data?.readMoreLabel}</Label>
        </div>
      </div>
      <EventDateList
        timeSuffix={websiteSettings?.timeSuffix || ""}
        dates={events?.map((event) => new Date(event.date || "")) || []}
      />
    </Card>
  );
};
