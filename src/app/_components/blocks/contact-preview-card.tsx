import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { ContactPreviewCardQueryResult } from "../../../../generated/sanity/types";

const contactPreviewCardQuery = groq`*[_type == "contact-page"][0]{
    ...
}`;

export type ContactPreviewCardProps = ComponentProps<typeof Card> & {};

export const ContactPreviewCard: FC<ContactPreviewCardProps> = async ({ className, ...restProps }) => {
  const contactPage = await sanity.fetch<ContactPreviewCardQueryResult>(
    contactPreviewCardQuery,
    {},
    { next: { tags: ["contact-page"] } },
  );

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
      <Link href="/kontakt#beratung" className="group block flex-1">
        <Card className="flex h-full flex-col bg-primary-100">
          <Heading size="sm" className="text-primary-100-text-muted">
            {contactPage?.personalConsulting?.name}
          </Heading>
          <Heading className="text-primary-100-text">{contactPage?.personalConsulting?.heading}</Heading>
          <Paragraph>{contactPage?.personalConsulting?.previewText}</Paragraph>
          <InteractionBubble animated={false} className="mt-auto" />
        </Card>
      </Link>
      <Link href="/kontakt#infoabend" className="group block flex-1">
        <Card className="flex h-full flex-col bg-primary-900">
          <Heading size="sm" className="text-primary-900-text-muted">
            {contactPage?.infoEvening?.name}
          </Heading>
          <Heading className="text-primary-900-text">{contactPage?.infoEvening?.heading}</Heading>
          <Paragraph className="text-neutral-900-text-muted">{contactPage?.infoEvening?.previewText}</Paragraph>
          <InteractionBubble animated={false} className="mt-auto bg-neutral-100 text-neutral-100-text" />
        </Card>
      </Link>
    </Card>
  );
};
