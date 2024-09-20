import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { groq } from "next-sanity";
import { ProgramGridProgramTypesQueryResult, ProgramGridProgramsQueryResult } from "../../../../generated/sanity/types";
import { sanityFetch } from "~/sanity/lib/client";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { ProgramMenuLink, ProgramTypeMenuLink } from "~/app/_components/compounds/programs-menu-link";

const programGridProgramTypesQuery = groq`*[_type == "educational-program-type"]{
  ...,
}`;

const programGridProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  educationalProgramType->{ _id }
}`;

export type ProgramGridProps = ComponentProps<"div"> & {};

export const ProgramGrid: FC<ProgramGridProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanityFetch<ProgramGridProgramTypesQueryResult>(programGridProgramTypesQuery, {
    tags: ["educational-program-type"],
  });

  const programs = await sanityFetch<ProgramGridProgramsQueryResult>(programGridProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programTypesWithPrograms = programTypes.map((programType) => ({
    ...programType,
    programs: programs.filter((program) => program.educationalProgramType?._id === programType._id),
  }));

  return (
    <div
      className={cn("grid grid-cols-[repeat(auto-fit,minmax(18rem,1fr))] gap-3 xl:flex-1", className)}
      {...restProps}
    >
      {programTypesWithPrograms.map((programType) => (
        <div key={programType._id} className="flex flex-1 flex-col gap-2 rounded-3xl border p-2">
          <ProgramTypeMenuLink
            href={`/bildungswege/${programType.slug?.current}`}
            heading={programType.name || ""}
            description={programType.promotionalHeadline || ""}
          />
          <div className="flex flex-1 flex-col gap-2">
            {programType.programs.map((program) => (
              <ProgramMenuLink
                key={program._id}
                href={`/bildungswege/${programType.slug?.current}/${program.slug?.current}`}
                heading={program.name || ""}
                color={ensureValidHSL(programType.color?.hsl)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
