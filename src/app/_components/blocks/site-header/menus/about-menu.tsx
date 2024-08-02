import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import {
  AboutMenuArtQueryResult,
  AboutMenuCampusQueryResult,
  AboutMenuEconomySocialQueryResult,
} from "../../../../../../generated/sanity/types";

const aboutMenuArtQuery = groq`*[_type == "art-page"][0]{
  navigationLabel,
  preview {
    excerpt,
    image { asset -> { url } }
  }
}`;

const aboutMenuCampusQuery = groq`*[_type == "campus-page"][0]{
  navigationLabel,
  previewText,
  previewImage { asset -> { url } }
}`;

const aboutMenuEconomySocialQuery = groq`*[_type == "economy-social-page"][0]{
  navigationLabel,
  previewText,
  previewImage { asset -> { url } }
}`;

export type AboutMenuProps = ComponentProps<"div"> & {};

export const AboutMenu: FC<AboutMenuProps> = async ({ className, ...restProps }) => {
  const [art, campus, economySocial] = await Promise.all([
    sanityFetch<AboutMenuArtQueryResult>(aboutMenuArtQuery, { tags: ["art-page"] }),
    sanityFetch<AboutMenuCampusQueryResult>(aboutMenuCampusQuery, { tags: ["campus-page"] }),
    sanityFetch<AboutMenuEconomySocialQueryResult>(aboutMenuEconomySocialQuery, {
      tags: ["economy-social-page"],
    }),
  ]);

  return (
    <div className={cn(className)} {...restProps}>
      <Container className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 py-4">
        <Link
          href="/about/wirtschaft-und-soziales"
          className="group flex flex-col rounded-3xl border p-2 transition-colors hover:bg-neutral-100"
        >
          <div className="flex-1 p-6">
            <Heading size="sm">{economySocial?.navigationLabel}</Heading>
            <Paragraph className="line-clamp-2">{economySocial?.previewText}</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={economySocial?.previewImage?.asset?.url || ""}
              alt={economySocial?.navigationLabel || ""}
              width="500"
              height="500"
              className="h-full w-full object-cover brightness-90"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Link>

        <Link
          href="/about/kunst"
          className="group flex flex-col rounded-3xl border p-2 transition-colors hover:bg-neutral-100"
        >
          <div className="flex-1 p-6">
            <Heading size="sm">{art?.navigationLabel}</Heading>
            <Paragraph className="line-clamp-2">{art?.preview?.excerpt}.</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={art?.preview?.image?.asset?.url || ""}
              alt={art?.navigationLabel || ""}
              width="500"
              height="500"
              className="h-full w-full object-cover"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Link>

        <Link
          href="/about/campus"
          className="group flex flex-col rounded-3xl border p-2 transition-colors hover:bg-neutral-100"
        >
          <div className="flex-1 p-6">
            <Heading size="sm">{campus?.navigationLabel}</Heading>
            <Paragraph className="line-clamp-2">{campus?.previewText}</Paragraph>
          </div>
          <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
            <Image
              src={campus?.previewImage?.asset?.url || ""}
              alt={campus?.navigationLabel || ""}
              width="500"
              height="500"
              className="h-full w-full object-cover"
            />
            <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </Link>
      </Container>
    </div>
  );
};
