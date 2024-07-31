import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { CalendarCheck2Icon, HourglassIcon, SunriseIcon, TreePalmIcon } from "lucide-react";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Button } from "../primitives/button";
import { InteractionBubble } from "./interaction-bubble";
import Image from "next/image";

export type EducationalProgramDetailsProps = ComponentProps<"div"> & {
  durationHeading: string;
  lessonTimesHeading: string;
  holidaysHeading: string;
  startDateHeading: string;
  trainingType: string;
  startEndTime: [string, string];
  duration: string;
  holidays: string;
  startDate: string;
  applyButtonLabel: string;
  startDateBackgroundGraphic: string;
};

export const EducationalProgramDetails: FC<EducationalProgramDetailsProps> = ({
  className,
  durationHeading,
  lessonTimesHeading,
  holidaysHeading,
  startDateHeading,
  trainingType,
  startDate,
  startEndTime,
  duration,
  holidays,
  applyButtonLabel,
  startDateBackgroundGraphic,
  ...restProps
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2 sm:gap-4", className)} {...restProps}>
      <DurationCard heading={durationHeading} duration={duration} trainingType={trainingType} />
      <StartEndTimeCard heading={lessonTimesHeading} start={startEndTime[0]} end={startEndTime[1]} />
      <HolidaysCard heading={holidaysHeading} holidays={holidays} />
      <StartDateCard
        heading={startDateHeading}
        startDate={startDate}
        applyButtonLabel={applyButtonLabel}
        backgroundGraphicURL={startDateBackgroundGraphic}
      />
    </div>
  );
};

const DurationCard: FC<{ heading: string; duration: string; trainingType: string }> = ({
  heading,
  duration,
  trainingType,
}) => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <HourglassIcon />
      <Label>{heading}</Label>
      <Heading className="m-0 mt-auto">{duration}</Heading>
      <Heading size="sm" className="mt-0">
        {trainingType}
      </Heading>
    </Card>
  );
};

const StartEndTimeCard: FC<{ heading: string; start: string; end: string }> = ({ heading, start, end }) => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <SunriseIcon />
      <Label>{heading}</Label>
      <div className="relative mt-auto flex flex-col">
        <div className="absolute bottom-6 left-[2.5px] top-6 w-px bg-neutral-900" />
        <div className="flex items-center gap-4">
          <div className="h-[6px] w-[6px] rounded-full bg-neutral-900" />
          <Heading size="sm">{start}</Heading>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-[6px] w-[6px] rounded-full bg-neutral-900" />
          <Heading size="sm">{end}</Heading>
        </div>
      </div>
    </Card>
  );
};

const HolidaysCard: FC<{ heading: string; holidays: string }> = ({ heading, holidays }) => {
  return (
    <Card className="flex flex-1 flex-col gap-4 bg-themed-primary">
      <TreePalmIcon />
      <Label>{heading}</Label>
      <Paragraph className="mt-auto">{holidays}</Paragraph>
    </Card>
  );
};

const StartDateCard: FC<{
  heading: string;
  startDate: string;
  applyButtonLabel: string;
  backgroundGraphicURL: string;
}> = ({ heading, startDate, applyButtonLabel, backgroundGraphicURL }) => {
  return (
    <Card className="relative flex flex-1 flex-col gap-4 bg-primary-900 text-primary-900-text lg:flex-row lg:items-end">
      <div>
        <CalendarCheck2Icon />
        <Heading>{heading}</Heading>
        <Heading size="sm" className="mt-auto">
          {startDate}
        </Heading>
      </div>

      <Image
        src={backgroundGraphicURL}
        alt={heading}
        height={500}
        width={500}
        className="absolute bottom-0 right-0 h-1/2 rotate-180 object-contain object-right-top text-neutral-100 opacity-50 lg:h-full lg:rotate-0"
      />

      <Button className="z-10 gap-4 bg-primary-100 pr-4 lg:ml-auto" href="/go">
        <Label className="text-neutral-900">{applyButtonLabel}</Label>
        <InteractionBubble animated={false} />
      </Button>
    </Card>
  );
};
