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
import { ContactPage2QueryResult, ContactPageBentoCTAQueryResult } from "../../../../../../generated/sanity/types";
import { InfoEventCTACard } from "~/app/_components/compounds/info-event-cta-card";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { InstagramIcon } from "~/app/_components/compounds/icons/instagram";
import { notFound } from "next/navigation";

const contactPage2Query = groq`*[_type == "contact-page"][0]`;

const contactPageBentoCTAQuery = groq`*[_type == "bento-cta-config"][0]{
  personalConsultingSplineGraphic { asset -> { url } }
}`;

const ContactPage: FC = async () => {
  const pageData = await sanityFetch<ContactPage2QueryResult>(contactPage2Query, { tags: ["contact-page"] });

  if (!pageData) notFound();

  const bentoCTAData = await sanityFetch<ContactPageBentoCTAQueryResult>(contactPageBentoCTAQuery, {
    tags: ["bento-cta-config"],
  });

  return (
    <>
      <div className="relative">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>Wir freuen uns dich kennenzulernen</Heading>
            <Paragraph>Mach den nächsten schritt für deine Zukunft und schreib uns ne Nachricht!</Paragraph>
          </div>
          <div className="flex flex-col gap-8 lg:flex-row">
            <Card className="flex flex-1 flex-col gap-2 rounded-3xl border border-neutral-400 bg-primary-900 p-2 text-neutral-900-text">
              <a
                href="tel:+4917640763524"
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <PhoneIcon />
                <Label>+49 176 4083 4725</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
              <a
                href="mailto:info@emil-molt-akademie.de"
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <MailIcon />
                <Label>info@emil-molt-akademie.de</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                className="group flex items-center gap-4 rounded-2xl bg-neutral-100/10 p-3 transition-colors hover:bg-neutral-100/20"
              >
                <InstagramIcon />
                <Label>emil.molt.akademie</Label>
                <SquareArrowOutUpRightIcon
                  className="ml-auto translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                  size="20"
                />
              </a>
            </Card>
            <Card className="flex flex-[2] flex-col gap-2 border border-neutral-400 bg-neutral-300 p-2 sm:flex-row">
              {["Mo", "Di", "Mi", "Do", "Fr"].map((day, index) => (
                <div key={index} className="flex flex-1 flex-col justify-end rounded-2xl bg-primary-100 p-6">
                  <Heading size="lg">{day}</Heading>
                  <div className="relative">
                    <Label className="block">14:30</Label>
                    <Label className="block">14:30</Label>
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
              <Link href="/kontakt">
                <InfoEventCTACard
                  heading={pageData.infoEvening?.name || ""}
                  description={pageData.infoEvening?.previewText || ""}
                  readMoreLabel={pageData.infoEvening?.readMoreLabel || ""}
                  timeSuffix={pageData.infoEvening?.timeSuffix || ""}
                  dates={
                    pageData.infoEvening?.nextDates
                      ?.filter(({ eventDate }) => !!eventDate)
                      .map(({ eventDate }) => new Date(eventDate!)) || []
                  }
                />
              </Link>
              <a href="https://google.com" target="_blank" className="group">
                <Card className="mt-8 rounded-3xl border border-neutral-400 bg-primary-900 p-4">
                  <div className="flex flex-col justify-between gap-8 p-4 text-neutral-900-text xl:flex-row xl:items-end">
                    <div className="max-w-96">
                      <Heading size="sm">Besuche uns auf unserem Campus</Heading>
                      <Paragraph className="text-neutral-900-text-muted">
                        Die Türen zu unserem Sekretäriat stehen dir zu unseren Sprechzeiten offen.
                      </Paragraph>
                    </div>
                    <div>
                      <MapPinIcon className="transition-transform group-hover:translate-y-2" />
                      <Heading size="sm" className="mb-0">
                        Monumentenstraße 13
                      </Heading>
                      <Label className="text-neutral-900-text-muted">361 Berlin Kreuzberg</Label>
                    </div>
                  </div>
                  <div className="relative mt-4 grid h-[50vh] w-full place-items-center overflow-hidden rounded-2xl border">
                    <IconChip className="z-10">
                      <SquareArrowOutUpRight />
                    </IconChip>
                    <Image
                      src="/map.png"
                      width="1000"
                      height="1000"
                      alt="Karte"
                      className="absolute left-0 top-0 h-full w-full object-cover saturate-50 transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Card>
              </a>
            </div>
            <Card className="flex flex-[0.5] flex-col gap-8 rounded-3xl border border-neutral-400 p-0 pb-16">
              <div className="p-8">
                <Heading tag="h3">{pageData.personalConsulting?.name}</Heading>
                <Paragraph className="mt-8">{pageData.personalConsulting?.previewText}</Paragraph>
                <Button
                  vairant="filled"
                  href="/kontakt"
                  className="mt-12 !rounded-full bg-[hsl(var(--themed-primary,var(--primary-900)))]"
                >
                  <Label>{pageData.personalConsulting?.readMoreLabel}</Label>
                  <ButtonInteractionBubble />
                </Button>
              </div>
              <Image
                src={bentoCTAData?.personalConsultingSplineGraphic?.asset?.url || ""}
                alt={pageData.personalConsulting?.name || ""}
                width="500"
                height="500"
                className="mt-auto w-full"
              />
            </Card>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
