import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { CalendarCheck2Icon, HourglassIcon, SunriseIcon, TreePalmIcon } from "lucide-react";
import { Heading, Label, Paragraph } from "../primitives/typography";

export type EducationalProgramDetailsProps = ComponentProps<"div"> & {};

export const EducationalProgramDetails: FC<EducationalProgramDetailsProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("flex flex-wrap gap-4", className)} {...restProps}>
      <DurationCard />
      <StartEndTimeCard />

      <HolidaysCard />
      <StartDateCard />
    </div>
  );
};

const DurationCard: FC = () => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <HourglassIcon />
      <Label>Ausbildungsdauer</Label>
      <Heading className="m-0 mt-auto">3 Jahre</Heading>
      <Heading size="sm" className="mt-0">
        Ganztagesausbildung
      </Heading>
    </Card>
  );
};

const StartEndTimeCard: FC = () => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <SunriseIcon />
      <Label>Unterrichtszeiten</Label>
      <div className="relative mt-auto flex flex-col">
        <div className="absolute bottom-6 left-[2.5px] top-6 w-px bg-neutral-900" />
        <div className="flex items-center gap-4">
          <div className="h-[6px] w-[6px] rounded-full bg-neutral-900" />
          <Heading size="sm">8:30 Uhr</Heading>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[6px] w-[6px] rounded-full bg-neutral-900" />
          <Heading size="sm">15:00 Uhr</Heading>
        </div>
      </div>
    </Card>
  );
};

const HolidaysCard: FC = () => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <TreePalmIcon />
      <Label>Ferien</Label>
      <Paragraph className="mt-auto">Ferien hast du wie alle anderen auch.</Paragraph>
    </Card>
  );
};

const StartDateCard: FC = () => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-primary-900 text-primary-900-text">
      <CalendarCheck2Icon />
      <Heading>{"Los geht's"}</Heading>
      <Heading size="sm" className="mt-auto">
        Am 13. Juli 2024
      </Heading>
    </Card>
  );
};
