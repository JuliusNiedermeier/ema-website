import { FC } from "react";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { OfferCard } from "~/app/_components/primitives/offers/offers";
import { Chip } from "~/app/_components/primitives/chip";
import { cn } from "~/app/_utils/cn";
import { useApplicationFormState } from "../state";

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
    <div className="text-center">
      <Heading>Wähle einen Bildungsweg</Heading>
      <Paragraph>Die Wahl deines Bildungsweges ist sehr wichtig.</Paragraph>
      <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-4">
        {programs.map((program, index) => (
          <button key={index} onClick={() => setProgram(program.ID)}>
            <OfferCard
              key={index}
              className={cn("h-full text-left", {
                "ring ring-primary-900": program.ID === selectedProgram,
              })}
              style={{
                backgroundColor: program.colors?.primary,
                opacity: program.ID === selectedProgram ? 1 : 0.8,
              }}
            >
              <Label>{program.programType.name}</Label>
              <Heading size="sm" className="mb-0 mt-0">
                {program.name}
              </Heading>
              {program.variant && (
                <Chip style={{ backgroundColor: program.colors.secondary }} className="mt-2">
                  {program.variant}
                </Chip>
              )}
            </OfferCard>
          </button>
        ))}
      </div>
    </div>
  );
};
