import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { SiteLogo } from "../compounds/site-logo";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { TestimonialCard } from "../compounds/testimonial-card";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  BentoCTAConsultingQueryResult,
  BentoCTAEventsQueryResult,
  BentoCTAInfoEventQueryResult,
  BentoCTAQueryResult,
  BentoCTATimeSuffixQueryResult,
} from "../../../../generated/sanity/types";
import { InfoEventCTACard } from "../compounds/info-event-cta-card";
import Link from "next/link";
import { SanityImage } from "../primitives/sanity-image";

const bentoCTAQuery = groq`*[_type == "bento-cta-config"][0]{
  ...,
  testimonial ->
}`;

const bentoCTAInfoEventQuery = groq`*[_type == "info-event-page"][0] {
  heading,
  teaser,
  readMoreLabel,
}`;

const bentoCTAEventsQuery = groq`*[_type == "event" && showOnInfoEventPage == true && dateTime(date) >= dateTime(now())] | order(date asc) [0..2]`;

const bentoCTATimeSuffixQuery = groq`*[_type == "website-settings"][0]{
  timeSuffix
}`;

const bentoCTAConsultingQuery = groq`*[_type == "consulting-page"][0] {
  heading,
  teaser,
  readMoreLabel,
  splineGraphic
}`;

export type BentoCTAProps = ComponentProps<"div"> & {};

export const BentoCTA: FC<BentoCTAProps> = async ({ className, ...restProps }) => {
  const [data, infoEvent, events, websiteSettings, consulting] = await Promise.all([
    sanityFetch<BentoCTAQueryResult>(bentoCTAQuery, { tags: ["bento-cta-config", "testimonial"] }),
    sanityFetch<BentoCTAInfoEventQueryResult>(bentoCTAInfoEventQuery, { tags: ["info-event-page"] }),
    sanityFetch<BentoCTAEventsQueryResult>(bentoCTAEventsQuery, { tags: ["event"] }),
    sanityFetch<BentoCTATimeSuffixQueryResult>(bentoCTATimeSuffixQuery, { tags: ["website-settings"] }),
    sanityFetch<BentoCTAConsultingQueryResult>(bentoCTAConsultingQuery, { tags: ["consulting-page"] }),
  ]);

  return (
    <div className={cn("flex flex-col gap-4 xl:flex-row", className)} {...restProps}>
      <div className="flex flex-[2.5] flex-col gap-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <Card className="group flex-[1.2] rounded-3xl border-none bg-primary-900 p-8" asChild>
            <Link href="/online-bewerbung">
              <SiteLogo show="mark" variant="light" />
              <Heading tag="h2" className="mt-8 text-neutral-200">
                {data?.primarySection?.heading}
              </Heading>
              <Paragraph className="text-neutral-100">{data?.primarySection?.description}</Paragraph>
              <Button
                vairant="filled"
                className="mt-12 bg-[hsl(var(--themed-primary,var(--primary-100)))] text-primary-100-text"
              >
                <Label>{data?.primarySection?.buttonLabel}</Label>
                <ButtonInteractionBubble />
              </Button>
            </Link>
          </Card>
          <TestimonialCard
            className="flex-1 rounded-3xl bg-primary-100"
            rating={data?.testimonial?.stars || 5}
            authorName={data?.testimonial?.authorName || ""}
            authorImage={data?.testimonial?.authorImage}
            body={data?.testimonial?.testimonial || ""}
          />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link className="flex-[1]" href="/kontakt/info-abend">
            <InfoEventCTACard
              heading={infoEvent?.heading || ""}
              description={infoEvent?.teaser || ""}
              readMoreLabel={infoEvent?.readMoreLabel || ""}
              timeSuffix={websiteSettings?.timeSuffix || ""}
              dates={events?.map((event) => new Date(event.date || "")) || []}
            />
          </Link>
        </div>
      </div>
      <Card
        className="group flex flex-1 flex-col justify-end gap-8 rounded-3xl border border-neutral-400 p-0 pb-16"
        asChild
      >
        <Link href="/kontakt/beratung">
          <div className="p-8">
            <Heading tag="h3">{consulting?.heading}</Heading>
            <Paragraph className="mt-8">{consulting?.teaser}</Paragraph>
            <Button vairant="filled" className="mt-12 !rounded-full bg-[hsl(var(--themed-primary,var(--primary-900)))]">
              <Label>{consulting?.readMoreLabel}</Label>
              <ButtonInteractionBubble className="bg-primary-100 text-primary-100-text" />
            </Button>
          </div>
          <SanityImage image={consulting?.splineGraphic} width="500" height="500" className="w-full" />
        </Link>
      </Card>
    </div>
  );
};
