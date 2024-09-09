import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  ContactPreviewCardConsultingQueryResult,
  ContactPreviewCardInfoEventQueryResult,
  ContactPreviewCardQueryResult,
} from "../../../../generated/sanity/types";

const contactPreviewCardQuery = groq`*[_type == "contact-page"][0]{
    ...
}`;

const contactPreviewCardInfoEventQuery = groq`*[_type == "info-event-page"][0]{
  preview
}`;

const contactPreviewCardConsultingQuery = groq`*[_type == "consulting-page"][0]{
  preview
}`;

export type ContactPreviewCardProps = ComponentProps<typeof Card> & {};

export const ContactPreviewCard: FC<ContactPreviewCardProps> = async ({ className, ...restProps }) => {
  const contactPage = await sanityFetch<ContactPreviewCardQueryResult>(contactPreviewCardQuery, {
    tags: ["contact-page"],
  });

  const infoEvent = await sanityFetch<ContactPreviewCardInfoEventQueryResult>(contactPreviewCardInfoEventQuery, {
    tags: ["info-event-page"],
  });

  const consulting = await sanityFetch<ContactPreviewCardConsultingQueryResult>(contactPreviewCardConsultingQuery, {
    tags: ["consulting-page"],
  });

  return (
    <Card className={cn("flex flex-col items-stretch gap-4 rounded-3xl p-4 sm:flex-row", className)} {...restProps}>
      <Link href="/kontakt" className="group block flex-1">
        <Card className="flex h-full flex-col bg-transparent transition-colors group-hover:bg-neutral-300">
          <Heading>{contactPage?.preview?.heading}</Heading>
          <Paragraph>{contactPage?.preview?.intorduction}</Paragraph>
          <div className="mt-auto flex items-center gap-4 pt-8">
            <InteractionBubble animated={false} />
            <Label>{contactPage?.preview?.readMoreButtonLabel}</Label>
          </div>
        </Card>
      </Link>

      <Link href="/kontakt/info-abend" className="group block flex-1">
        <Card className="flex h-full flex-col bg-primary-900">
          <Heading className="text-primary-900-text">{infoEvent?.preview?.title}</Heading>
          <Paragraph className="text-neutral-900-text-muted">{infoEvent?.preview?.description}</Paragraph>
          <InteractionBubble animated={false} className="mt-auto bg-neutral-100 text-neutral-100-text" />
        </Card>
      </Link>

      <Link href="/kontakt/beratung" className="group block flex-1">
        <Card className="flex h-full flex-col bg-primary-100">
          <Heading className="text-primary-100-text">{consulting?.preview?.title}</Heading>
          <Paragraph>{consulting?.preview?.description}</Paragraph>
          <InteractionBubble animated={false} className="mt-auto" />
        </Card>
      </Link>
    </Card>
  );
};
