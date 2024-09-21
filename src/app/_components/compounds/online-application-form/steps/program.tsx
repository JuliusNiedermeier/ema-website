"use client";

import { FormStepComponent } from "../provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { useApplicationFormState } from "../state";
import { Heading, Label } from "~/app/_components/primitives/typography";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";
import { cn } from "~/app/_utils/cn";
import { BaseStep } from "../base-step";

export type ProgramStepProps = {
  heading: string;
  programs: { ID: string; name: string; type: string; color: HSLValue }[];
};

export const ProgramStep: FormStepComponent<ProgramStepProps> = ({ heading, programs }) => {
  const { program: selectedProgram, setProgram } = useApplicationFormState();

  return (
    <BaseStep heading={heading}>
      <div className="mt-8 grid grid-cols-1 gap-4">
        {programs.map((program) => (
          <div
            key={program.ID}
            style={createColorThemeStyles(program.color)}
            className={cn("cursor-pointer rounded-2xl bg-themed-primary p-4 transition-all", {
              "ring-4 ring-themed-secondary/50": program.ID === selectedProgram,
              "opacity-90": selectedProgram && program.ID !== selectedProgram,
            })}
            onClick={() => setProgram(selectedProgram === program.ID ? null : program.ID)}
          >
            <Label className="opacity-50">{program.type}</Label>
            <Label className="mt-1 block">{program.name}</Label>
          </div>
        ))}
      </div>
    </BaseStep>
  );
};

const schema = applicationInputSchema.pick({ programID: true });

ProgramStep.validate = ({ program }) => {
  return schema.safeParse({ programID: program }).success;
};
