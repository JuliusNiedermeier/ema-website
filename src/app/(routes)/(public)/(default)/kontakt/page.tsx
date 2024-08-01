import { VariantProps, cva } from "class-variance-authority";
import {
  AtSignIcon,
  CalendarCheckIcon,
  ClockIcon,
  ExternalLinkIcon,
  LucideIcon,
  PhoneCallIcon,
  UsersIcon,
  VideoIcon,
} from "lucide-react";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, FC } from "react";
import { Button } from "~/app/_components/primitives/button";
import { Card } from "~/app/_components/primitives/card";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { cn } from "~/app/_utils/cn";
import { sanityFetch } from "~/sanity/lib/client";
import { ContactPageQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import { AppointmentRequestForm } from "~/app/_components/compounds/appointment-request-form";
import { EventDateList } from "~/app/_components/compounds/event-date-list";

const contactPageQuery = groq`*[_type == "contact-page"][0]{
  ...,
  map {
    ...,
    image { asset -> { url } }
  }
}`;

type SectionLink = {
  ID: string;
  icon: LucideIcon;
  name: string;
};

const ContactPage: FC = async () => {
  const data = await sanityFetch<ContactPageQueryResult>(contactPageQuery, { tags: ["contact-page"] });

  if (!data) notFound();

  const sectionLinks = [
    { ID: "info-event", icon: UsersIcon, name: data.infoEvening?.name || "" },
    { ID: "personal-consulting", icon: CalendarCheckIcon, name: data.personalConsulting?.name || "" },
    { ID: "contact", icon: AtSignIcon, name: data.contact?.name || "" },
  ] as const satisfies SectionLink[];

  return (
    <div>
      <div className="bg-neutral-200 pt-16">
        <Container className="flex flex-col gap-16 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Heading>{data?.heading}</Heading>
            <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-4">
              {sectionLinks.map((sectionLink) => (
                <Card key={sectionLink.ID} className="flex items-center gap-4 bg-primary-100 p-4" asChild>
                  <Link href={`/kontakt#${sectionLink.ID}`}>
                    <div className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full bg-primary-900 text-primary-100">
                      <sectionLink.icon size="18" />
                    </div>
                    <Label>{sectionLink.name}</Label>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative aspect-square flex-1 overflow-hidden rounded-2xl rounded-b-none border border-b-0 border-neutral-900/20">
            <Image
              src={data?.map?.image?.asset?.url || ""}
              height="1000"
              width="1000"
              alt="Karte"
              className="h-full w-full object-cover"
            />
            <Button href={data?.map?.buttonLink} external className="absolute bottom-4 right-4 gap-2">
              <Label>{data?.map?.buttonLabel}</Label>
              <ExternalLinkIcon size="18" />
            </Button>
          </div>
        </Container>
      </div>

      <Container
        id={sectionLinks.find(({ ID }) => ID == "info-event")!.ID}
        className="flex flex-col gap-16 py-32 sm:flex-row"
      >
        <div className="flex-1">
          <SectionIndicator name={data?.infoEvening?.name || ""} icon={UsersIcon} />
          <Heading className="mt-8">{data?.infoEvening?.heading}</Heading>
          <Paragraph>{data?.infoEvening?.previewText}</Paragraph>
        </div>
        <EventDateList
          className="flex-1"
          timeSuffix={data.infoEvening?.timeSuffix || ""}
          dates={
            data?.infoEvening?.nextDates
              ?.filter(({ eventDate }) => !!eventDate)
              .map(({ eventDate }) => new Date(eventDate!)) || []
          }
        />
      </Container>

      <div id={sectionLinks.find(({ ID }) => ID == "personal-consulting")!.ID} className="bg-primary-900 py-32">
        <Container className="flex flex-col gap-16 sm:flex-row">
          <div className="flex-1">
            <SectionIndicator name={data?.personalConsulting?.name || ""} icon={VideoIcon} on="dark" />
            <Heading className="mt-8 text-neutral-900-text">{data?.personalConsulting?.heading}</Heading>
            <Paragraph className="text-neutral-900-text">{data?.personalConsulting?.previewText}</Paragraph>
          </div>
          <div className="flex-1">
            <AppointmentRequestForm
              defaultType="online"
              onlineTypeLabel={data.personalConsulting?.booking?.type?.onlineLabel || ""}
              inPersonTypeLabel={data.personalConsulting?.booking?.type?.offlineLabel || ""}
              namePlaceholder={data.personalConsulting?.booking?.namePlaceholder || ""}
              emailPlaceholder={data.personalConsulting?.booking?.emailPlaceholder || ""}
              submitButtonLabel={data.personalConsulting?.booking?.requestButtonLabel || ""}
            />
            <Paragraph className="mt-16 text-neutral-900-text-muted">
              {data?.personalConsulting?.booking?.alternativeContact}
            </Paragraph>
          </div>
        </Container>
      </div>

      <Container
        id={sectionLinks.find(({ ID }) => ID == "contact")!.ID}
        className="flex flex-col gap-16 pt-32 sm:flex-row sm:pb-32"
      >
        <div className="flex-1">
          <SectionIndicator name={data?.contact?.name || ""} icon={AtSignIcon} />
          <Heading className="mt-8">{data?.contact?.heading || ""}</Heading>
          <Paragraph>{data?.contact?.description || ""}</Paragraph>
        </div>
        <div className="flex-1">
          <div className="relative z-10 rounded-2xl border bg-neutral-100 px-8 py-8">
            <div className="flex items-center gap-2">
              <AtSignIcon />
              <Label>{data?.contact?.email?.heading || ""}</Label>
            </div>
            <Label className="mt-4 block">{data?.contact?.email?.email || ""}</Label>
          </div>
          <div className="mt-4 rounded-2xl border">
            <div className="p-8">
              <div className="flex items-center gap-2">
                <PhoneCallIcon />
                <Label>{data?.contact?.phone?.heading || ""}</Label>
              </div>
              <Label className="mt-4 block">{data?.contact?.phone?.number || ""}</Label>

              <div className="my-8 h-px w-full bg-neutral-400" />

              <div className="flex items-center gap-2">
                <ClockIcon />
                <Label>{data.contact?.phone?.officeHours?.heading}</Label>
              </div>
              <div className="mt-6 flex flex-col gap-4">
                {data.contact?.phone?.officeHours?.days?.map(({ day, from, to, _key }) => (
                  <div key={_key} className="flex items-center gap-4">
                    <Label>{day}</Label>
                    <div className="h-px flex-1 bg-neutral-400" />
                    {from && to && <Label>{`${from} - ${to} ${data.contact?.phone?.officeHours?.timeSuffix}`}</Label>}
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;

type SectionIndicatorProps = ComponentProps<"div"> &
  VariantProps<typeof sectionIndicatorVariants> & {
    name: string;
    icon: LucideIcon;
  };

const sectionIndicatorVariants = cva("flex items-center gap-4", {
  variants: {
    on: {
      light: "[&>div]:bg-primary-900 [&>div]:text-primary-900-text [&>span]:text-neutral-100-text",
      dark: "[&>div]:bg-primary-100 [&>div]:text-primary-100-text [&>span]:text-neutral-900-text",
    },
  },
  defaultVariants: {
    on: "light",
  },
});

const SectionIndicator: FC<SectionIndicatorProps> = ({ className, name, icon: Icon, on, ...restProps }) => {
  return (
    <div className={cn(sectionIndicatorVariants({ on }), className)} {...restProps}>
      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full">
        <Icon size="18" />
      </div>
      <Label>{name}</Label>
    </div>
  );
};
