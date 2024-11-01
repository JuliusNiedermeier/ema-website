import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { CampusCardQueryResult } from "../../../../generated/sanity/types";
import { Card } from "../primitives/card";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { SanityImage } from "../primitives/sanity-image";

const campusCardQuery = groq`*[_type == "campus-page"][0] {
    heading,
    teaser,
    readMoreLabel,
    "image": staff[0].image,
}`;

export type CampusCardProps = ComponentProps<"div"> & {};

export const CampusCard: FC<CampusCardProps> = async ({ className, ...restProps }) => {
  const data = await sanityFetch<CampusCardQueryResult>(campusCardQuery, { tags: ["campus-page"] });

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-neutral-900/10 p-2 pt-64 lg:p-8 lg:pt-96",
        className,
      )}
      {...restProps}
    >
      <Card className="relative z-10 block max-w-[40rem] border border-neutral-400 bg-neutral-300 transition-colors">
        <Heading tag="h2">{data?.heading}</Heading>
        <Paragraph>{data?.teaser}</Paragraph>
        <div className="mt-8 flex items-center gap-4">
          <InteractionBubble animated={false} />
          <Label>{data?.readMoreLabel}</Label>
        </div>
      </Card>

      <SanityImage image={data?.image} fill />
    </div>
  );
};
