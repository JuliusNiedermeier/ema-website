import {
  CalendarCheck2Icon,
  GraduationCapIcon,
  HourglassIcon,
  LucideIcon,
  PartyPopperIcon,
  SunriseIcon,
} from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";
import { IconListItem } from "../primitives/icon-list-item";

export type ProgramDetailsProps = ComponentProps<"div"> & {
  details: { type: string; startEndTime: string; startDate: string; holidays: string; totalDuration: string };
};

export const ProgramDetails: FC<ProgramDetailsProps> = ({ className, details, ...restProps }) => {
  const datailItems: Record<
    keyof ProgramDetailsProps["details"],
    { heading: string; description: string; icon: LucideIcon }
  > = {
    type: {
      heading: "Unterrichtsform",
      description: details.type,
      icon: GraduationCapIcon,
    },
    startEndTime: {
      heading: "Unterrichtszeiten",
      description: details.startEndTime,
      icon: SunriseIcon,
    },
    startDate: {
      heading: "Ausbildungsbeginn",
      description: details.startDate,
      icon: CalendarCheck2Icon,
    },
    holidays: {
      heading: "Ferien",
      description: details.holidays,
      icon: PartyPopperIcon,
    },
    totalDuration: {
      heading: "Ausbildungsdauer",
      description: details.totalDuration,
      icon: HourglassIcon,
    },
  };

  return (
    <div className={cn("mt-20 grid grid-cols-[repeat(auto-fit,minmax(20rem,1fr))] gap-8", className)} {...restProps}>
      {Object.keys(datailItems).map((detailItemKey) => {
        const detailItem = datailItems[detailItemKey as keyof typeof datailItems];

        return (
          <IconListItem align="top">
            <detailItem.icon className="flex-shrink-0" />
            <div>
              <Label>{detailItem.heading}</Label>
              <Label className="text-neutral-100-text-muted">{detailItem.description}</Label>
            </div>
          </IconListItem>
        );
      })}
    </div>
  );
};
