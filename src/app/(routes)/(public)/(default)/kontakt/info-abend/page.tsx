import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { InfoEventPageQueryResult } from "../../../../../../../generated/sanity/types";
import { EventDateList } from "~/app/_components/compounds/event-date-list";
import { Button } from "~/app/_components/primitives/button";
import { CornerUpRightIcon } from "lucide-react";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { cn } from "~/app/_utils/cn";
import { AuthorTagImage } from "~/app/_components/primitives/author-tag";
import { TestimonialCarousel } from "~/app/_components/blocks/testimonial-carousel";
import { Card } from "~/app/_components/primitives/card";
import Image from "next/image";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";

const infoEventPageQuery = groq`*[_type == "info-event-page"][0] {
  ...,
  speaker[] {
    ...,
    image { alt, asset -> { url } }
  },
  benefits[] {
    ...,
    image { alt, asset -> { url } }
  }
}`;

const ContactPage: FC = async () => {
  const infoEventPageData = await sanityFetch<InfoEventPageQueryResult>(infoEventPageQuery, {
    tags: ["info-event-page"],
  });

  if (!infoEventPageData) notFound();

  return (
    <>
      <div className="relative pb-32 pt-header">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10 pt-20" width="narrow">
          <div className="mx-auto text-center">
            <Heading>{infoEventPageData.heading}</Heading>
            <Paragraph>{infoEventPageData.description}</Paragraph>
          </div>

          <div className="mt-16 flex items-center justify-center">
            {infoEventPageData.speaker?.map((speaker, index) => (
              <AuthorTagImage
                key={index}
                src={speaker.image?.asset?.url || ""}
                alt={speaker.image?.alt || ""}
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
            dates={infoEventPageData.nextDates?.map((date) => new Date(date.eventDate || "")) || []}
            timeSuffix={infoEventPageData.timeSuffix || ""}
          />
        </Container>
        <Container className="mt-20">
          <div className="flex flex-wrap gap-4">
            {infoEventPageData.benefits?.map((benefit, index) => (
              <Card key={index} className="flex flex-grow basis-80 flex-col bg-primary-900 p-2">
                <div className="p-6">
                  <Heading size="sm" className="text-neutral-900-text">
                    {benefit.title}
                  </Heading>
                  <Paragraph className="text-neutral-900-text-muted">{benefit.description}</Paragraph>
                </div>
                <Image
                  src={benefit.image?.asset?.url || ""}
                  width="500"
                  height="500"
                  alt={benefit.image?.alt || ""}
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
              <Label>{infoEventPageData.alternativeCTA?.buttonLabel}</Label>
              <InteractionBubble animated={false} className="bg-primary-100 text-primary-100-text" />
            </Button>
          </Container>
        </EndOfPageCTA>
      </div>
    </>
  );
};

export default ContactPage;
