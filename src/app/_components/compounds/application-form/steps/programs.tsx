"use client";

import { FC } from "react";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { OfferCard } from "~/app/_components/primitives/offers/offers";
import { Chip } from "~/app/_components/primitives/chip";
import { cn } from "~/app/_utils/cn";
import { useApplicationFormState } from "../state";
import { StepIcon } from "~/app/_components/primitives/step-list";
import { CheckIcon } from "lucide-react";

export type ProgramsStepProps = {
  programs: {
    ID: string;
    name: string;
    programType: { ID: string; name: string };
    colors: { primary: string; secondary: string };
    variant?: string;
  }[];
};

export const ProgramsStep: FC<ProgramsStepProps> = ({ programs }) => {
  const { program: selectedProgram, setProgram } = useApplicationFormState();

  return (
    <div>
      <Heading>Für welchen Bildungsgang möchtest du dich anmelden?</Heading>
      <div className="mt-16 flex flex-col gap-4">
        {programs.map((program, index) => (
          <button key={index} onClick={() => setProgram(program.ID)}>
            <OfferCard
              key={index}
              className={cn("flex h-full items-center gap-4 overflow-hidden text-left")}
              style={{
                backgroundColor: program.colors?.primary,
              }}
            >
              <div className="flex-1">
                <Label>{program.programType.name}</Label>
                <Heading size="sm" className="mb-0 mt-0">
                  {program.name}
                </Heading>
                {program.variant && <Label>{program.variant}</Label>}
              </div>
              <StepIcon
                status="complete"
                className={cn("transition-all", { "translate-x-[200%] rotate-90": program.ID !== selectedProgram })}
              >
                <CheckIcon />
              </StepIcon>
            </OfferCard>
          </button>
        ))}
      </div>
    </div>
  );
};
