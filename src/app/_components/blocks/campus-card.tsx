import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { CampusCardQueryResult } from "../../../../generated/sanity/types";
import { Card } from "../primitives/card";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Image from "next/image";

const campusCardQuery = groq`*[_type == "campus-page"][0] {
    ...,
    heroImage { asset -> { url } },
    images[] { asset -> { url } },
    team[] {
        ...,
        image { asset -> { url } }
    }
}`;

export type CampusCardProps = ComponentProps<"div"> & {};

export const CampusCard: FC<CampusCardProps> = async ({ className, ...restProps }) => {
  const data = await sanity.fetch<CampusCardQueryResult>(campusCardQuery, {}, { next: { tags: ["campus-page"] } });

  return (
    <Card className={cn("group relative overflow-hidden bg-transparent p-0", className)} {...restProps}>
      <Image
        src={data?.heroImage?.asset?.url || ""}
        height={1000}
        width={1000}
        alt="Campus"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
      />
      <Card className="m-2 mt-64 max-w-[40rem] bg-neutral-100 lg:m-4 lg:mt-64">
        <Heading>{data?.heading}</Heading>
        <Paragraph>{data?.previewText}</Paragraph>
        <div className="mt-8 flex items-center gap-4">
          <InteractionBubble animated={false} />
          <Label>Deinen Campus kennenlernen</Label>
        </div>
      </Card>
    </Card>
  );
};
