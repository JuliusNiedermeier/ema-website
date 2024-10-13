import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramLearningFieldsComparisonQueryResult } from "../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { Card } from "../primitives/card";
import { Label } from "../primitives/typography";
import { IconList, IconListItem, IconListItemContent, IconListItemIcon } from "../primitives/icon-list";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { LinkCard, LinkCardContent, LinkCardLabel, LinkCardTitle } from "../primitives/link-card";
import Link from "next/link";

const programLearningFieldsComparisonQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
  _id,
  slug,
  name,
  color,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] | order(order asc) {
    _id,
    slug,
    name,
    learningFields
  } [count(learningFields) > 0]
}`;

export type ProgramLearningFieldsComparisonProps = ComponentProps<"div"> & {};

export const ProgramLearningFieldsComparison: FC<ProgramLearningFieldsComparisonProps> = async ({
  className,
  ...restProps
}) => {
  const programTypes = await sanityFetch<ProgramLearningFieldsComparisonQueryResult>(
    programLearningFieldsComparisonQuery,
    {
      tags: ["educational-program-type", "educational-program"],
    },
  );

  const programs = programTypes
    .map((programType) => {
      const { programs, ...type } = programType;
      return programs.map((program) => ({ ...program, type }));
    })
    .flat();

  return (
    <div
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4 overflow-hidden", className)}
      {...restProps}
    >
      {programs.map((program) => (
        <Card
          key={program._id}
          style={createColorThemeStyles(ensureValidHSL(program.type.color?.hsl))}
          className="flex flex-col overflow-hidden rounded-3xl bg-themed-primary p-0"
        >
          <Link href={`/bildungswege/${program.type.slug?.current}/${program.slug?.current}`} className="m-2">
            <LinkCard className="border-none bg-transparent shadow-none hover:bg-themed-secondary">
              <LinkCardContent>
                <LinkCardLabel>{program.type.name}</LinkCardLabel>
                <LinkCardTitle>{program.name}</LinkCardTitle>
              </LinkCardContent>
              <InteractionBubble animated={false} />
            </LinkCard>
          </Link>
          <div className="flex-1 rounded-t-3xl bg-themed-secondary p-8">
            <IconList>
              {program.learningFields?.map((learningField) => (
                <IconListItem align="top">
                  <IconListItemIcon>
                    <div className="rounded-md border border-neutral-100/10 bg-themed-primary px-2 py-px shadow">
                      <Label className="text-small">{learningField.short}</Label>
                    </div>
                  </IconListItemIcon>
                  <IconListItemContent>
                    <Label>{learningField.long}</Label>
                  </IconListItemContent>
                </IconListItem>
              ))}
            </IconList>
          </div>
        </Card>
      ))}
    </div>
  );
};
