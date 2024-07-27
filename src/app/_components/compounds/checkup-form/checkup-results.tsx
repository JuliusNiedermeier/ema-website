"use client";

import { ComponentProps, FC, useMemo } from "react";
import { cn } from "~/app/_utils/cn";
import { EducationalProgramCard } from "../educational-program-card";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";
import Link from "next/link";
import { useCheckupForm } from "./checkup-form-provider";

export type CheckupResultsProps = ComponentProps<"div"> & {
  educationalPrograms: {
    ID: string;
    name: string;
    programType: { name: string; slug: string };
    slogan: string;
    color: HSLValue;
    slug: string;
  }[];
};

export const CheckupResults: FC<CheckupResultsProps> = ({ className, educationalPrograms, ...restProps }) => {
  const { ranking } = useCheckupForm();

  const rankedPrograms = useMemo(() => {
    return ranking
      .filter(({ rank }) => rank > 0)
      .map((result) => educationalPrograms.find((program) => program.ID === result.ID))
      .filter((program) => typeof program !== "undefined");
  }, [ranking, educationalPrograms]);

  return (
    <div className={cn("flex flex-col gap-8", className)} {...restProps}>
      {rankedPrograms.map((program) => (
        <Link href={`/bildungswege/${program.programType.slug}/${program.slug}`}>
          <EducationalProgramCard
            headline={program.slogan}
            name={program.name}
            programType={program.programType.name}
            style={createColorThemeStyles(program.color)}
          />
        </Link>
      ))}
    </div>
  );
};
