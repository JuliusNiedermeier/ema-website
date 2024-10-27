import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  InfoEventPageQueryResult,
  InfoEventPageConsultingPageQueryResult,
  InfoEventPageMetaQueryResult,
  InfoEventPageEventsQueryResult,
  InfoEventPageTimeSuffixQueryResult,
} from "../../../../../../../generated/sanity/types";
import { EventDateList } from "~/app/_components/compounds/event-date-list";
import { Button } from "~/app/_components/primitives/button";
import { CornerUpRightIcon } from "lucide-react";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { cn } from "~/app/_utils/cn";
import { AuthorTagImage } from "~/app/_components/primitives/author-tag";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { Card } from "~/app/_components/primitives/card";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";
import { SanityImage } from "~/app/_components/primitives/sanity-image";

const infoEventPageQuery = groq`*[_type == "info-event-page"][0] {
  heading,
  teaser,
  directionsCTA,
  alternativeCTA,
  speaker,
  benefits[] {
    title,
    description,
    image
  }
}`;

const infoEventPageEventsQuery = groq`*[_type == "event" && showOnInfoEventPage == true] | order(date asc) [0..2]`;

const infoEventPageTimeSuffixQuery = groq`*[_type == "website-settings"][0]{
  timeSuffix
}`;

const infoEventPageConsultingPageQuery = groq`*[_type == "consulting-page"][0] {
  readMoreLabel
}`;

const infoEventPageMetaQuery = groq`*[_type == "info-event-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<InfoEventPageMetaQueryResult>(infoEventPageMetaQuery, {
  tags: ["info-event-page"],
});

const ContactPage: FC = async () => {
  const [infoEventPageData, events, websiteSettings, consultingPageData] = await Promise.all([
    sanityFetch<InfoEventPageQueryResult>(infoEventPageQuery, {
      tags: ["info-event-page"],
    }),

    sanityFetch<InfoEventPageEventsQueryResult>(infoEventPageEventsQuery, {
      tags: ["event"],
    }),

    sanityFetch<InfoEventPageTimeSuffixQueryResult>(infoEventPageTimeSuffixQuery, {
      tags: ["website-settings"],
    }),

    sanityFetch<InfoEventPageConsultingPageQueryResult>(infoEventPageConsultingPageQuery, {
      tags: ["consulting-page"],
    }),
  ]);

  if (!infoEventPageData) notFound();

  return (
    <>
      <div className="relative pb-32 pt-header">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10 pt-20" width="narrow">
          <div className="mx-auto text-center">
            <Heading tag="h1">{infoEventPageData.heading}</Heading>
            <Paragraph>{infoEventPageData.teaser}</Paragraph>
          </div>

          <div className="mt-16 flex items-center justify-center">
            {infoEventPageData.speaker?.map((speaker, index) => (
              <AuthorTagImage
                key={index}
                image={speaker}
                className={cn("h-12 w-12 border-4 border-neutral-200", { "-ml-4": index > 0 })}
              />
            ))}
          </div>

          <a href={infoEventPageData.directionsCTA?.link} target="_blank" className="mx-auto mt-4 block w-fit">
            <Button className="gap-4 pr-4">
              <CornerUpRightIcon />
              <Label>{infoEventPageData.directionsCTA?.label}</Label>
              <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
            </Button>
          </a>

          <EventDateList
            className="mt-12"
            dates={events?.map((event) => new Date(event.date || "")) || []}
            timeSuffix={websiteSettings?.timeSuffix || ""}
          />
        </Container>
        <Container className="mt-20">
          <div className="flex flex-wrap gap-4">
            {infoEventPageData.benefits?.map((benefit, index) => (
              <Card key={index} className="flex flex-grow basis-80 flex-col bg-primary-900 p-2">
                <div className="p-6">
                  <Heading tag="h3" size="sm" className="text-neutral-900-text">
                    {benefit.title}
                  </Heading>
                  <Paragraph className="text-neutral-900-text-muted">{benefit.description}</Paragraph>
                </div>
                <SanityImage
                  image={benefit.image}
                  width="500"
                  height="500"
                  className="mt-auto aspect-video w-full rounded-xl object-cover"
                />
              </Card>
            ))}
          </div>
          <TestimonialCarousel className="mt-20" />
        </Container>

        <EndOfPageCTA
          className="mt-12"
          heading={infoEventPageData.alternativeCTA?.heading || ""}
          description={infoEventPageData.alternativeCTA?.description || ""}
        >
          <Container className="-mt-12">
            <Button href="/kontakt/beratung" className="mx-auto gap-4 pr-4">
              <Label>{consultingPageData?.readMoreLabel}</Label>
              <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
            </Button>
          </Container>
        </EndOfPageCTA>
      </div>
    </>
  );
};

export default ContactPage;
