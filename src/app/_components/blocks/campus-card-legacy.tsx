import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { CampusCardLegacyQueryResult } from "../../../../generated/sanity/types";
import { Card } from "../primitives/card";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Image from "next/image";

const campusCardLegacyQuery = groq`*[_type == "campus-page"][0] {
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
  const data = await sanity.fetch<CampusCardLegacyQueryResult>(campusCardLegacyQuery);

  return (
    <div
      className={cn(
        "group grid cursor-pointer gap-2 overflow-hidden rounded-3xl lg:grid-cols-[1fr_min-content_1fr_1fr_1fr] lg:grid-rows-[14rem_10rem_1fr] lg:gap-4",
        className,
      )}
      {...restProps}
    >
      <Image
        src={data?.images?.[0].asset?.url || ""}
        height={500}
        width={500}
        alt="Bild 1"
        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:-translate-x-4 group-hover:-translate-y-4"
      />
      <div className="grid aspect-square grid-cols-3 grid-rows-3 gap-4">
        {data?.team
          ?.slice(0, 9)
          .map((teamMember, index) => (
            <Image
              key={index}
              src={teamMember.image?.asset?.url || ""}
              height={100}
              width={100}
              alt={teamMember.name || ""}
              className="aspect-square rounded-full bg-neutral-200 object-cover"
            />
          ))}
      </div>
      <Image
        src={data?.heroImage?.asset?.url || ""}
        height={500}
        width={500}
        alt="Bild 2"
        className="col-span-2 h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:-translate-y-4"
      />
      <Image
        src={data?.images?.[1].asset?.url || ""}
        height={500}
        width={500}
        alt="Bild 3"
        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:-translate-y-4 group-hover:translate-x-4"
      />
      <Image
        src={data?.images?.[2].asset?.url || ""}
        height={500}
        width={500}
        alt="Bild 4"
        className="col-span-2 h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:-translate-x-4"
      />
      <div className="col-span-2 row-span-2 min-w-96 p-4">
        <Heading>{data?.heading}</Heading>
        <Paragraph>{data?.previewText}</Paragraph>
      </div>
      <Image
        src={data?.images?.[3].asset?.url || ""}
        height={500}
        width={500}
        alt="Bild 5"
        className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:translate-x-4"
      />
      <div className="col-span-2 p-8">
        <div className="flex h-8 items-center gap-4">
          <InteractionBubble />
          <Label>Mehr lesen</Label>
        </div>
      </div>
    </div>
  );
};
