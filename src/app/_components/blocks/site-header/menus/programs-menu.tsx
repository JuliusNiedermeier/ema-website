import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "~/app/_components/primitives/card";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { groq } from "next-sanity";
import { ProgramsMenuCheckupQueryResult } from "../../../../../../generated/sanity/types";
import { sanityFetch } from "~/sanity/lib/client";
import Image from "next/image";
import { ProgramGrid } from "../../program-grid";

const programsMenuCheckupQuery = groq`*[_type == "checkup-page"][0]{
  heading,
  previewText,
  previewReadMoreLabel
}`;

export type OffersMenuProps = ComponentProps<"div"> & {};

export const OffersMenu: FC<OffersMenuProps> = async ({ className, ...restProps }) => {
  const checkup = await sanityFetch<ProgramsMenuCheckupQueryResult>(programsMenuCheckupQuery, {
    tags: ["checkup-page"],
  });

  return (
    <div className={cn("flex h-min flex-col-reverse gap-3 p-3 sm:items-stretch xl:flex-row", className)} {...restProps}>
      <Card
        className="flex w-full flex-col justify-end rounded-3xl bg-primary-900 p-2 text-neutral-900-text xl:max-w-96"
        data-animate
      >
        <Image
          src="/checkup-card.png"
          height={500}
          width={500}
          alt="Checkup graphic"
          className="overflow-hidden rounded-2xl"
        />
        <div className="p-6">
          <Heading size="sm" className="mt-8">
            {checkup?.heading}
          </Heading>
          <Paragraph className="flex-1xsd text-neutral-900-text-muted">{checkup?.previewText}</Paragraph>
          <Button vairant="outline" size="sm" className="mt-8" href="/checkup">
            <Label>{checkup?.previewReadMoreLabel}</Label>
            <InteractionBubble />
          </Button>
        </div>
      </Card>

      <ProgramGrid />
    </div>
  );
};
