import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { ConsultingCTACardQueryResult } from "../../../../generated/sanity/types";
import { SanityImage } from "../primitives/sanity-image";

const consultingCTACardQuery = groq`*[_type == "consulting-page"][0] {
  heading,
  teaser,
  readMoreLabel,
  splineGraphic
}`;

export type ConsultingCTACardProps = ComponentProps<typeof Card> & {};

export const ConsultingCTACard: FC<ConsultingCTACardProps> = async ({ className, ...restProps }) => {
  const data = await sanityFetch<ConsultingCTACardQueryResult>(consultingCTACardQuery, { tags: ["consulting-page"] });

  return (
    <Card
      className={cn("group flex flex-col gap-8 rounded-3xl border border-neutral-400 p-0 pb-8", className)}
      {...restProps}
    >
      <div className="p-8">
        <Heading tag="h3">{data?.heading}</Heading>
        <Paragraph className="mt-8">{data?.teaser}</Paragraph>
        <Button vairant="filled" className="mt-12 !rounded-full bg-[hsl(var(--themed-primary,var(--primary-900)))]">
          <Label>{data?.readMoreLabel}</Label>
          <ButtonInteractionBubble className="bg-primary-100 text-primary-100-text" />
        </Button>
      </div>
      <SanityImage image={data?.splineGraphic} width="500" height="500" className="mt-auto w-full" />
    </Card>
  );
};
