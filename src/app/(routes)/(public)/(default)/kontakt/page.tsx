import { MailIcon, MapPinIcon, PhoneIcon, SquareArrowOutUpRight, SquareArrowOutUpRightIcon } from "lucide-react";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button, ButtonInteractionBubble } from "~/app/_components/primitives/button";
import { Card } from "~/app/_components/primitives/card";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  ContactPageQueryResult,
  ContactPageConsultingQueryResult,
  ContactPageInfoEventQueryResult,
} from "../../../../../../generated/sanity/types";
import { InfoEventCTACard } from "~/app/_components/compounds/info-event-cta-card";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { InstagramIcon } from "~/app/_components/compounds/icons/instagram";
import { notFound } from "next/navigation";

const contactPageQuery = groq`*[_type == "contact-page"][0] {
  ...,
  location {
    ...,
    map { asset -> { url } }
  }
}`;

const contactPageInfoEventQuery = groq`*[_type == "info-event-page"][0] {
  preview,
  nextDates,
  timeSuffix
}`;

const contactPageConsultingQuery = groq`*[_type == "consulting-page"][0] {
  preview {
    ...,
    splineGraphic { asset -> { url } }
  }
}`;

const ContactPage: FC = async () => {
  const contactPageData = await sanityFetch<ContactPageQueryResult>(contactPageQuery, { tags: ["contact-page"] });

  if (!contactPageData) notFound();

  const infoEvent = await sanityFetch<ContactPageInfoEventQueryResult>(contactPageInfoEventQuery, {
    tags: ["info-event-page"],
  });

  const consulting = await sanityFetch<ContactPageConsultingQueryResult>(contactPageConsultingQuery, {
    tags: ["consulting-page"],
  });

  return (
    <>
      <div className="relative">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>{contactPageData.heading}</Heading>
            <Paragraph>{contactPageData.description}</Paragraph>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <Card className="flex flex-1 flex-col gap-2 rounded-3xl border border-neutral-400 bg-primary-900 p-2 text-neutral-900-text">
              <a
                href={`tel:${contactPageData.contactInformation?.phone}`}
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <PhoneIcon />
                <Label>{contactPageData.contactInformation?.phone}</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
              <a
                href={`mailto:${contactPageData.contactInformation?.email}`}
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <MailIcon />
                <Label>{contactPageData.contactInformation?.email}</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
              <a
                href={`https://instagram.com/${contactPageData.contactInformation?.instagram}`}
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <InstagramIcon />
                <Label>{contactPageData.contactInformation?.instagram}</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
            </Card>
            <Card className="flex flex-[2] flex-col gap-2 border border-neutral-400 bg-neutral-300 p-2 sm:flex-row">
              {contactPageData.officeHours?.map((day, index) => (
                <div key={index} className="flex flex-1 flex-col justify-end rounded-2xl bg-primary-100 p-6">
                  <Heading size="lg">{day.day}</Heading>
                  <div className="relative">
                    <Label className="block">{day.from}</Label>
                    <Label className="block">{day.to}</Label>
                    <div className="absolute -left-2 bottom-0 top-0 flex flex-col items-center justify-center [&>*]:bg-primary-100-text-muted">
                      <div className="h-1 w-1 rounded-full" />
                      <div className="h-1/3 w-px" />
                      <div className="h-1 w-1 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </Card>
          </div>
          <div className="mt-8 flex flex-col gap-8 lg:flex-row">
            <div className="flex-1">
              <Link href="/kontakt/info-abend">
                <InfoEventCTACard
                  heading={infoEvent?.preview?.title || ""}
                  description={infoEvent?.preview?.description || ""}
                  readMoreLabel={infoEvent?.preview?.readMoreLabel || ""}
                  timeSuffix={infoEvent?.timeSuffix || ""}
                  dates={
                    infoEvent?.nextDates
                      ?.filter(({ eventDate }) => !!eventDate)
                      .map(({ eventDate }) => new Date(eventDate!)) || []
                  }
                />
              </Link>
              <a href={contactPageData.location?.mapsLink} target="_blank" className="group">
                <Card className="mt-8 rounded-3xl border border-neutral-400 bg-primary-900 p-4">
                  <div className="flex flex-col justify-between gap-8 p-4 text-neutral-900-text xl:flex-row xl:items-end">
                    <div className="max-w-96">
                      <Heading size="sm">{contactPageData.location?.heading}</Heading>
                      <Paragraph className="text-neutral-900-text-muted">
                        {contactPageData.location?.description}
                      </Paragraph>
                    </div>
                    <div>
                      <MapPinIcon className="transition-transform group-hover:translate-y-2" />
                      <Heading size="sm" className="mb-0">
                        {contactPageData.location?.address?.street}
                      </Heading>
                      <Label className="text-neutral-900-text-muted">
                        {contactPageData.location?.address?.zipAndCity}
                      </Label>
                    </div>
                  </div>
                  <div className="relative mt-4 grid h-[50vh] w-full place-items-center overflow-hidden rounded-2xl border">
                    <IconChip className="z-10">
                      <SquareArrowOutUpRight />
                    </IconChip>
                    <Image
                      src={contactPageData.location?.map?.asset?.url || ""}
                      width="1000"
                      height="1000"
                      alt={`${contactPageData.location?.address?.street}, ${contactPageData.location?.address?.zipAndCity}`}
                      className="absolute left-0 top-0 h-full w-full object-cover saturate-50 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Card>
              </a>
            </div>
            <Card
              className="group flex flex-[0.5] flex-col gap-8 rounded-3xl border border-neutral-400 p-0 pb-16"
              asChild
            >
              <Link href="/kontakt/beratung">
                <div className="p-8">
                  <Heading tag="h3">{consulting?.preview?.title}</Heading>
                  <Paragraph className="mt-8">{consulting?.preview?.description}</Paragraph>
                  <Button
                    vairant="filled"
                    className="mt-12 !rounded-full bg-[hsl(var(--themed-primary,var(--primary-900)))]"
                  >
                    <Label>{consulting?.preview?.readMoreLabel}</Label>
                    <ButtonInteractionBubble className="bg-primary-100 text-primary-100-text" />
                  </Button>
                </div>
                <Image
                  src={consulting?.preview?.splineGraphic?.asset?.url || ""}
                  alt={consulting?.preview?.title || ""}
                  width="500"
                  height="500"
                  className="mt-auto w-full"
                />
              </Link>
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
