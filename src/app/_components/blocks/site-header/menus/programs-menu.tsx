import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "~/app/_components/primitives/card";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { groq } from "next-sanity";
import { ProgramsMenuComparisonQueryResult } from "../../../../../../generated/sanity/types";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramGrid } from "../../program-grid";
import Link from "next/link";
import { StackedImageCard } from "~/app/_components/compounds/stacked-image-card";

const programsMenuComparisonQuery = groq`*[_type == "comparison-page"][0]{
  heading,
  teaser,
  readMoreLabel,
  previewImages[] { alt, asset -> { url } }
}`;

export type OffersMenuProps = ComponentProps<"div"> & {};

export const OffersMenu: FC<OffersMenuProps> = async ({ className, ...restProps }) => {
  const comparison = await sanityFetch<ProgramsMenuComparisonQueryResult>(programsMenuComparisonQuery, {
    tags: ["comparison-page"],
  });

  return (
    <div className={cn("flex h-min flex-col-reverse gap-3 p-3 sm:items-stretch xl:flex-row", className)} {...restProps}>
      <Link href="/vergleich">
        <Card
          className="group flex h-full w-full flex-col justify-end rounded-3xl bg-primary-900 p-2 text-neutral-900-text xl:max-w-96"
          data-animate
        >
          <StackedImageCard
            className="flex-[10rem] border border-neutral-100/10 bg-neutral-100/10 xl:flex-1"
            images={
              comparison?.previewImages?.map((image, index) => ({
                url: image.asset?.url || "",
                alt: image.alt || "",
              })) || []
            }
          />
          <div className="p-6">
            <Heading size="sm" className="mt-8">
              {comparison?.heading}
            </Heading>
            <Paragraph className="flex-1xsd text-neutral-900-text-muted">{comparison?.teaser}</Paragraph>
            <Button vairant="outline" size="sm" className="mt-8">
              <Label>{comparison?.readMoreLabel}</Label>
              <InteractionBubble />
            </Button>
          </div>
        </Card>
      </Link>

      <ProgramGrid />
    </div>
  );
};
