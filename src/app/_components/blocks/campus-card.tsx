import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import { CampusCardQueryResult } from "../../../../generated/sanity/types";
import { Card } from "../primitives/card";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Image from "next/image";
import Link from "next/link";
import { Container } from "../primitives/container";

const campusCardQuery = groq`*[_type == "campus-page"][0] {
    ...,
    heroImage { asset -> { url } },
}`;

export type CampusCardProps = ComponentProps<"div"> & {};

export const CampusCard: FC<CampusCardProps> = async ({ className, ...restProps }) => {
  const data = await sanityFetch<CampusCardQueryResult>(campusCardQuery, { tags: ["campus-page"] });

  return (
    <div className={cn("relative overflow-hidden pb-4 pt-64 lg:pb-8 lg:pt-96", className)} {...restProps}>
      <Image
        src={data?.heroImage?.asset?.url || ""}
        height={1000}
        width={1000}
        alt="Campus"
        className="absolute left-0 top-0 -z-10 h-full w-full object-cover"
      />
      <Container>
        <Card
          className="group block max-w-[40rem] bg-neutral-100/50 backdrop-blur-md transition-colors hover:bg-neutral-100/60"
          asChild
        >
          <Link href="/about/campus">
            <Heading>{data?.heading}</Heading>
            <Paragraph>{data?.previewText}</Paragraph>
            <div className="mt-8 flex items-center gap-4">
              <InteractionBubble animated={false} />
              <Label>{data?.previewReadMoreButtonLabel}</Label>
            </div>
          </Link>
        </Card>
      </Container>
    </div>
  );
};
