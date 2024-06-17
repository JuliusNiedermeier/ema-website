"use client";

import { Heading, Label } from "~/app/_components/primitives/typography";
import { cn } from "~/app/_utils/cn";
import { useApplicationFormState } from "../state";
import { StepIcon } from "~/app/_components/primitives/step-list";
import { CheckIcon } from "lucide-react";
import { FormStepComponent } from "../application-form-provider";
import { applicationInputSchema } from "~/server/resources/application/application-input-schema";
import { Card } from "~/app/_components/primitives/card";
import { ColorValue } from "@sanity/color-input";
import { HSLValue, createHSLString } from "~/app/_utils/color-swatch";

export type ProgramsStepProps = {
  programs: {
    ID: string;
    name: string;
    programType: { ID: string; name: string };
    hslColor: HSLValue;
    variant?: string;
  }[];
};

export const ProgramsStep: FormStepComponent<ProgramsStepProps> = ({ programs }) => {
  const { program: selectedProgram, setProgram } = useApplicationFormState();

  return (
    <div>
      <Heading>Für welchen Bildungsgang möchtest du dich anmelden?</Heading>
      <div className="mt-16 flex flex-col gap-4">
        {programs.map((program, index) => (
          <button key={index} onClick={() => setProgram(selectedProgram === program.ID ? null : program.ID)}>
            <Card
              key={index}
              className={cn("flex h-full items-center gap-4 overflow-hidden p-6 text-left")}
              style={{ backgroundColor: `hsl(${createHSLString(program.hslColor)})` }}
            >
              <div className="flex-1">
                <Label>{program.programType.name}</Label>
                <Heading size="sm" className="mb-0 mt-0">
                  {program.name}
                </Heading>
                {program.variant && <Label>{program.variant}</Label>}
              </div>
              <StepIcon
                variant="filled"
                className={cn("transition-all", { "translate-x-[200%] rotate-90": program.ID !== selectedProgram })}
              >
                <CheckIcon />
              </StepIcon>
            </Card>
          </button>
        ))}
      </div>
    </div>
  );
};

const schema = applicationInputSchema.pick({ programID: true });

ProgramsStep.validate = (state) => schema.safeParse({ programID: state.program }).success;
