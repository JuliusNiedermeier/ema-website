import { ComponentProps, FC } from "react";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";
import { Container } from "~/app/_components/primitives/container";
import { Card } from "~/app/_components/primitives/card";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { InteractionBubble } from "~/app/_components/compounds/interaction-bubble";
import { groq } from "next-sanity";
import {
  OffersGridProgramTypesQueryResult,
  OffersGridProgramsQueryResult,
  ProgramsMenuCheckupQueryResult,
} from "../../../../../../generated/sanity/types";
import { sanityFetch } from "~/sanity/lib/client";
import Image from "next/image";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const offersGridProgramTypesQuery = groq`*[_type == "educational-program-type"]{
  ...,
}`;

const offersGridProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  educationalProgramType->{ _id }
}`;

const programsMenuCheckupQuery = groq`*[_type == "checkup-page"][0]{
  heading,
  previewText,
  previewReadMoreLabel
}`;

export type OffersMenuProps = ComponentProps<"div"> & {};

export const OffersMenu: FC<OffersMenuProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanityFetch<OffersGridProgramTypesQueryResult>(offersGridProgramTypesQuery, {
    tags: ["educational-program-type"],
  });

  const programs = await sanityFetch<OffersGridProgramsQueryResult>(offersGridProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programTypesWithPrograms = programTypes.map((programType) => ({
    ...programType,
    programs: programs.filter((program) => program.educationalProgramType?._id === programType._id),
  }));

  const checkup = await sanityFetch<ProgramsMenuCheckupQueryResult>(programsMenuCheckupQuery, {
    tags: ["checkup-page"],
  });

  return (
    <div className={cn(className)} {...restProps}>
      <Container className={cn("flex h-min flex-col-reverse gap-4 py-4 sm:items-stretch xl:flex-row")}>
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

        <div className="grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 xl:flex-1">
          {programTypesWithPrograms.map((programType) => (
            <div key={programType._id} className="flex flex-1 flex-col gap-2 rounded-3xl border p-2">
              <Link
                href={`/bildungswege/${programType.slug?.current}`}
                className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-neutral-400"
              >
                <InteractionBubble animated={false} className="bg-neutral-400 text-primary-900" />
                <div className="flex-1 overflow-hidden">
                  <Heading size="sm" className="mb-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {programType.name}
                  </Heading>
                  <Paragraph className="mb-0 overflow-hidden text-ellipsis whitespace-nowrap">
                    {programType.promotionalHeadline} {programType.promotionalHeadline}{" "}
                    {programType.promotionalHeadline}
                  </Paragraph>
                </div>
              </Link>
              <div className="flex flex-1 flex-col gap-2">
                {programType.programs.map((program) => (
                  <Link
                    href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}
                    key={program._id}
                    style={createColorThemeStyles(ensureValidHSL(programType.color?.hsl))}
                    className="group flex flex-1 items-center gap-3 rounded-2xl bg-themed-primary p-2 transition-all hover:bg-themed-secondary"
                  >
                    <InteractionBubble animated={false} className="rounded-xl" />
                    <Label className="m-0 whitespace-nowrap">{program.name}</Label>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
