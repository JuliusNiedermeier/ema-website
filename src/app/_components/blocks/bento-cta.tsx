import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { SiteLogo } from "../compounds/site-logo";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { TestimonialCard } from "../compounds/testimonial-card";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { BentoCTAContactQueryResult, BentoCTAQueryResult } from "../../../../generated/sanity/types";
import Image from "next/image";
import { EventDateList } from "../compounds/event-date-list";

const bentoCTAQuery = groq`*[_type == "bento-cta-config"][0]{
  ...,
  testimonial -> {
    ...,
    authorImage { asset -> { url } }
  },
  personalConsultingSplineGraphic { asset -> { url } }
}`;

const bentoCTAContactQuery = groq`*[_type == "contact-page"][0]`;

export type BentoCTAProps = ComponentProps<"div"> & {};

export const BentoCTA: FC<BentoCTAProps> = async ({ className, ...restProps }) => {
  const data = await sanity.fetch<BentoCTAQueryResult>(bentoCTAQuery, {}, { next: { tags: ["bento-cta-config"] } });

  const contact = await sanity.fetch<BentoCTAContactQueryResult>(
    bentoCTAContactQuery,
    {},
    { next: { tags: ["contact-page"] } },
  );

  return (
    <div className={cn("flex flex-col gap-4 xl:flex-row", className)} {...restProps}>
      <div className="flex flex-[2.5] flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Card className="flex-[1.2] rounded-3xl border-none bg-primary-900 p-8">
            <SiteLogo show="mark" />
            <Heading tag="h3" className="mt-8 text-neutral-200">
              {data?.primarySection?.heading}
            </Heading>
            <Paragraph className="text-neutral-100">{data?.primarySection?.description}</Paragraph>
            <Button vairant="filled" href="/go" className="mt-12 bg-primary-100 text-primary-100-text">
              <Label>{data?.primarySection?.buttonLabel}</Label>
              <ButtonInteractionBubble />
            </Button>
          </Card>
          <TestimonialCard
            className="flex-1 rounded-3xl bg-primary-100"
            rating={data?.testimonial?.stars || 5}
            authorName={data?.testimonial?.authorName || ""}
            authorImage={data?.testimonial?.authorImage?.asset?.url || ""}
            body={data?.testimonial?.testimonial || ""}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a className="flex-[1]" href="/kontakt">
            <Card className="group flex flex-col gap-8 rounded-3xl border border-neutral-400 bg-neutral-300 p-4 md:flex-row">
              <div className="flex-1 p-4">
                <Heading size="lg" tag="h3" className="mt-3">
                  {contact?.infoEvening?.name}
                </Heading>
                <Paragraph className="mt-8">{contact?.infoEvening?.previewText}</Paragraph>
                <div className="mt-12 flex h-8 items-center gap-0 transition-all group-hover:gap-4">
                  <InteractionBubble />
                  <Label>{contact?.infoEvening?.readMoreLabel}</Label>
                </div>
              </div>
              <EventDateList
                timeSuffix={contact?.infoEvening?.timeSuffix || ""}
                dates={
                  contact?.infoEvening?.nextDates
                    ?.filter(({ eventDate }) => !!eventDate)
                    .map(({ eventDate }) => new Date(eventDate!)) || []
                }
              />
            </Card>
          </a>
        </div>
      </div>
      <Card className="flex flex-1 flex-col justify-end gap-8 rounded-3xl border border-neutral-400 p-0 pb-16">
        <div className="p-8">
          <Heading tag="h3">{contact?.personalConsulting?.name}</Heading>
          <Paragraph className="mt-8">{contact?.personalConsulting?.previewText}</Paragraph>
          <Button vairant="filled" href="/kontakt" className="mt-12 !rounded-full">
            <Label>{contact?.personalConsulting?.readMoreLabel}</Label>
            <ButtonInteractionBubble />
          </Button>
        </div>
        <Image
          src={data?.personalConsultingSplineGraphic?.asset?.url || ""}
          alt={contact?.personalConsulting?.name || ""}
          width="500"
          height="500"
          className="w-full"
        />
      </Card>
    </div>
  );
};
