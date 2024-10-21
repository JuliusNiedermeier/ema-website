import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label } from "../primitives/typography";

export type EventDateListProps = ComponentProps<"div"> & {
  dates: Date[];
  timeSuffix: string;
};

export const EventDateList: FC<EventDateListProps> = ({ className, dates, timeSuffix, ...restProps }) => {
  return (
    <div className={cn("divide-y overflow-hidden rounded-2xl border", className)} {...restProps}>
      {dates.map((date, index) => (
        <div
          key={index}
          className={cn("flex items-center justify-between gap-8 p-4", { "bg-primary-100": index === 0 })}
        >
          <div>
            <Heading tag="h3" size="sm" className="mb-0">
              {date.toLocaleDateString("de", { weekday: "long", day: "numeric", month: "long" })}
            </Heading>
            <Label className="text-neutral-100-text-muted">{date.toLocaleDateString("de", { year: "numeric" })}</Label>
          </div>
          <Label>{`${date.toLocaleTimeString("de", { timeStyle: "short" })} ${timeSuffix}`}</Label>
        </div>
      ))}
    </div>
  );
};
