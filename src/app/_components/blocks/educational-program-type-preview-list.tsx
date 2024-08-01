import { groq } from "next-sanity";
import { ComponentProps, FC, Fragment } from "react";
import { cn } from "~/app/_utils/cn";
import { sanityFetch } from "~/sanity/lib/client";
import {
  ProgramTypePreviewListProgramsQueryResult,
  ProgramTypePreviewListTypesQueryResult,
} from "../../../../generated/sanity/types";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Card } from "../primitives/card";
import Link from "next/link";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { ChevronDown } from "lucide-react";
import { EducationalProgramCard } from "../compounds/educational-program-card";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const programTypePreviewListTypesQuery = groq`*[_type == "educational-program-type"]{
  ...,
}`;

const programTypePreviewListProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  educationalProgramType->{ _id }
}`;

export type EducationalProgramTypePreviewListProps = ComponentProps<"div"> & {};

export const EducationalProgramTypePreviewList: FC<EducationalProgramTypePreviewListProps> = async ({
  className,
  ...restProps
}) => {
  const programTypes = await sanityFetch<ProgramTypePreviewListTypesQueryResult>(programTypePreviewListTypesQuery, {
    tags: ["educational-program-type"],
  });
  const programs = await sanityFetch<ProgramTypePreviewListProgramsQueryResult>(programTypePreviewListProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programTypesWithPrograms = programTypes.map((programType) => ({
    ...programType,
    introduction:
      (programType.introduction?.length || 0) > 250
        ? `${programType.introduction?.slice(0, 250)}...`
        : programType.introduction,
    programs: programs.filter((program) => program.educationalProgramType?._id === programType._id),
  }));

  return (
    <div className={cn("flex flex-col items-center gap-16", className)} {...restProps}>
      {programTypesWithPrograms.map((programType, index) => (
        <Fragment key={programType._id}>
          <div
            className={cn(
              "flex flex-col gap-4 rounded-3xl border p-2 lg:flex-row lg:items-stretch lg:rounded-[2rem] lg:p-4",
              {
                "lg:flex-row-reverse": index % 2 !== 0,
              },
            )}
          >
            <Card
              asChild
              className={cn(
                "group flex flex-col justify-center transition-colors lg:flex-1 lg:items-start lg:text-left [&:not(:hover)]:bg-transparent",
              )}
            >
              <Link href={`/bildungswege/${programType.slug?.current}`}>
                <Heading className="max-w-60 text-balance lg:max-w-96">{programType.promotionalHeadline}</Heading>
                <Paragraph className="text-balance">{programType.introduction}</Paragraph>
                <div className="mt-4 flex items-center gap-4">
                  <InteractionBubble animated={false} />
                  <Label>{programType.readMoreLabel}</Label>
                </div>
              </Link>
            </Card>
            <div className={cn("flex flex-col gap-2 lg:min-w-[60%] lg:flex-row lg:gap-4")}>
              {programType.programs.map((program) => (
                <Link
                  key={program._id}
                  href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}
                  className="flex-1 lg:w-min"
                >
                  <EducationalProgramCard
                    className="h-full pt-8"
                    style={createColorThemeStyles(ensureValidHSL(programType.color?.hsl))}
                    programType={programType.name || ""}
                    name={program.name || ""}
                    headline={program.promotionalHeadline || ""}
                  />
                </Link>
              ))}
            </div>
          </div>
          {index < programTypesWithPrograms.length - 1 && <ChevronDown />}
        </Fragment>
      ))}
    </div>
  );
};
