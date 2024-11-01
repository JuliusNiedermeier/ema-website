import { ComponentProps, FC, Fragment } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";
import { CheckIcon } from "lucide-react";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ProgramSubjectMatrixProgramsQueryResult } from "../../../../generated/sanity/types";
import { uniqueBy } from "~/app/_utils/uniqe-by";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

const programSubjectMatrixProgramsQuery = groq`*[_type == "educational-program-type"] | order(order asc) {
  _id,
  name,
  color,
  "programs": *[_type == "educational-program" && educationalProgramType._ref == ^._id] | order(order asc) {
    _id,
    name,
    subjects[] ->
  }
}`;

export type ProgramSubjectMatrixProps = ComponentProps<"div"> & {};

export const ProgramSubjectMatrix: FC<ProgramSubjectMatrixProps> = async ({ className, ...restProps }) => {
  const programTypes = await sanityFetch<ProgramSubjectMatrixProgramsQueryResult>(programSubjectMatrixProgramsQuery, {
    tags: ["educational-program-type", "educational-program", "subject"],
  });

  const programs = programTypes
    .map((programType) => {
      const { programs, ...type } = programType;
      return programs.map((program) => {
        return {
          ...program,
          type,
          subjectIDs: new Set<string>(program.subjects?.map((subject) => subject._id)),
        };
      });
    })
    .flat();

  const subjects = uniqueBy(programs.map((program) => program.subjects || []).flat(), (subject) => subject._id);

  return (
    <div
      className={cn("scrollbar-none relative grid overflow-x-auto overflow-y-hidden rounded-3xl border", className)}
      style={{ gridTemplateColumns: `repeat(${programs.length + 1},min-content)` }}
      {...restProps}
    >
      <div className="sticky left-0 hidden border-r border-neutral-100-text-muted bg-neutral-100/60 backdrop-blur-xl lg:block" />

      {programs.map((program, index) => (
        <div
          key={program._id}
          style={createColorThemeStyles(ensureValidHSL(program.type.color?.hsl))}
          className={cn("whitespace-nowrap bg-themed-primary p-4", {
            "border-l border-neutral-100-text-muted": index > 0,
          })}
        >
          <Label className="block text-neutral-100-text-muted">{program.type.name}</Label>
          <Label className="mt-1 block">{program.name}</Label>
        </div>
      ))}

      {subjects.map((subject) => (
        <Fragment key={subject._id}>
          <div
            className="left-0 z-10 col-start-1 -mb-10 grid h-10 items-center border-r border-t border-neutral-100-text-muted bg-neutral-900/5 lg:sticky lg:!col-span-1 lg:mb-0 lg:h-16 lg:bg-neutral-100/60 lg:backdrop-blur-xl"
            style={{ gridColumnEnd: programs.length + 2 }}
          >
            <Label className="sticky left-0 block w-fit whitespace-nowrap px-4 text-neutral-200-text">
              {subject.name}
            </Label>
          </div>

          {programs.map((program, programIndex) => {
            const checked = program.subjectIDs.has(subject._id);
            return (
              <div
                key={program._id}
                style={createColorThemeStyles(ensureValidHSL(program.type.color?.hsl))}
                className={cn(
                  "grid place-content-center border-t border-neutral-100-text-muted bg-themed-primary/50 p-2 pt-12 lg:pt-2",
                  {
                    "bg-themed-primary/80": checked,
                    "border-l": programIndex > 0,
                  },
                )}
              >
                {checked && (
                  <div className={cn("rounded-xl bg-primary-900 p-2 text-primary-900-text")}>
                    <CheckIcon />
                  </div>
                )}
              </div>
            );
          })}
        </Fragment>
      ))}
    </div>
  );
};
