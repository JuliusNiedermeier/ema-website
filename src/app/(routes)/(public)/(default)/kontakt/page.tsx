import { MailIcon, MapPinIcon, PhoneIcon, SquareArrowOutUpRight, SquareArrowOutUpRightIcon } from "lucide-react";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Card } from "~/app/_components/primitives/card";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { ContactPageQueryResult, ContactPageMetaQueryResult } from "../../../../../../generated/sanity/types";
import { InfoEventCTACard } from "~/app/_components/blocks/info-event-cta-card";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { InstagramIcon } from "~/app/_components/compounds/icons/instagram";
import { notFound } from "next/navigation";
import { ConsultingCTACard } from "~/app/_components/blocks/consulting-cta-card";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const contactPageQuery = groq`*[_type == "contact-page"][0] {
  heading,
  teaser,
  contactInformation,
  officeHours,
  location {
    ...,
    mapImage { alt, asset -> { url } }
  }
}`;

const contactPageMetaQuery = groq`*[_type == "contact-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<ContactPageMetaQueryResult>(contactPageMetaQuery, {
  tags: ["contact-page"],
});

const ContactPage: FC = async () => {
  const contactPageData = await sanityFetch<ContactPageQueryResult>(contactPageQuery, { tags: ["contact-page"] });

  if (!contactPageData) notFound();

  return (
    <>
      <div className="relative pt-header">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10">
          <div className="mx-auto max-w-[35rem] py-28 text-center">
            <Heading tag="h1">{contactPageData.heading}</Heading>
            <Paragraph>{contactPageData.teaser}</Paragraph>
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
            <Card className="flex flex-[2] flex-wrap gap-2 border border-neutral-400 bg-neutral-300 p-2">
              {contactPageData.officeHours?.map((day, index) => (
                <div key={index} className="flex flex-1 flex-col justify-end rounded-2xl bg-primary-100 p-6">
                  <Heading tag="h3" size="lg">
                    {day.day}
                  </Heading>
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
          <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-start">
            <div className="flex-1">
              <Link href="/kontakt/info-abend">
                <InfoEventCTACard />
              </Link>
              <a href={contactPageData.location?.mapsLink} target="_blank" className="group">
                <Card className="mt-8 rounded-3xl border border-neutral-400 bg-primary-900 p-4">
                  <div className="flex flex-col justify-between gap-8 p-4 text-neutral-900-text xl:flex-row xl:items-end">
                    <div className="max-w-96">
                      <Heading tag="h2" size="sm">
                        {contactPageData.location?.heading}
                      </Heading>
                      <Paragraph className="text-neutral-900-text-muted">
                        {contactPageData.location?.description}
                      </Paragraph>
                    </div>
                    <div>
                      <MapPinIcon className="transition-transform group-hover:translate-y-2" />
                      <Heading tag="h3" size="sm" className="mb-0">
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
                      src={contactPageData.location?.mapImage?.asset?.url || ""}
                      width="1000"
                      height="1000"
                      alt={contactPageData.location?.mapImage?.alt || ""}
                      className="absolute left-0 top-0 h-full w-full object-cover saturate-50 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Card>
              </a>
            </div>
            <Link href="/kontakt/beratung" className="flex-[0.5]">
              <ConsultingCTACard />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
