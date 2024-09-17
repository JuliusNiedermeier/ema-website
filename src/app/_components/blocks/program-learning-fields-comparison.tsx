import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramLearningFieldsComparisonQueryResult } from "../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { Card } from "../primitives/card";
import { Heading, Label } from "../primitives/typography";
import { IconListItem } from "../primitives/icon-list-item";
import { CheckIcon } from "lucide-react";

const programLearningFieldsComparisonQuery = groq`*[_type == "educational-program-type"] {
  _id,
  name,
  color,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] {
    _id,
    name,
    "subjects": select(subjects[] -> {
      _id,
      name,
      isLearningField
    }) [isLearningField == true]
  }
}`;

export type ProgramLearningFieldsComparisonProps = ComponentProps<"div"> & {};

export const ProgramLearningFieldsComparison: FC<ProgramLearningFieldsComparisonProps> = async ({
  className,
  ...restProps
}) => {
  const programTypes = await sanityFetch<ProgramLearningFieldsComparisonQueryResult>(
    programLearningFieldsComparisonQuery,
    {
      tags: ["educational-program-type", "educational-program", "subject"],
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
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8 overflow-hidden", className)}
      {...restProps}
    >
      {programs.map((program) => (
        <Card
          key={program._id}
          style={createColorThemeStyles(ensureValidHSL(program.type.color?.hsl))}
          className="bg-themed-primary"
        >
          <Label className="text-neutral-100-text-muted">{program.type.name}</Label>
          <Heading size="sm" className="mt-1">
            {program.name}
          </Heading>
          <div className="mt-8">
            {program.subjects?.map((subject) => (
              <IconListItem>
                <CheckIcon />
                <Label>{subject.name}</Label>
              </IconListItem>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};
