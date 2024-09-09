import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import Image from "next/image";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { ConsultingCTACardQueryResult } from "../../../../generated/sanity/types";

const consultingCTACardQuery = groq`*[_type == "consulting-page"][0] {
  preview {
    ...,
    splineGraphic { asset -> { url } }
  }
}`;

export type ConsultingCTACardProps = ComponentProps<typeof Card> & {};

export const ConsultingCTACard: FC<ConsultingCTACardProps> = async ({ className, ...restProps }) => {
  const data = await sanityFetch<ConsultingCTACardQueryResult>(consultingCTACardQuery, { tags: ["info-event-page"] });

  return (
    <Card
      className={cn("group flex flex-col gap-8 rounded-3xl border border-neutral-400 p-0", className)}
      {...restProps}
    >
      <div className="p-8">
        <Heading tag="h3">{data?.preview?.title}</Heading>
        <Paragraph className="mt-8">{data?.preview?.description}</Paragraph>
        <Button vairant="filled" className="mt-12 !rounded-full bg-[hsl(var(--themed-primary,var(--primary-900)))]">
          <Label>{data?.preview?.readMoreLabel}</Label>
          <ButtonInteractionBubble className="bg-primary-100 text-primary-100-text" />
        </Button>
      </div>
      <Image
        src={data?.preview?.splineGraphic?.asset?.url || ""}
        alt={data?.preview?.title || ""}
        width="500"
        height="500"
        className="mt-auto w-full"
      />
    </Card>
  );
};
