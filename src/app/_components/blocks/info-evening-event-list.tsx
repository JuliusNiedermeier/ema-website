import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label } from "../primitives/typography";

const infoEveningDates = [Date.now(), Date.now() + 1000 * 60 * 60 * 24 * 7, Date.now() + 1000 * 60 * 60 * 24 * 14];

export type InfoEveningEventListProps = ComponentProps<"div"> & {};

export const InfoEveningEventList: FC<InfoEveningEventListProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("divide-y overflow-hidden rounded-2xl border", className)} {...restProps}>
      {infoEveningDates.map((date, index) => (
        <div
          key={index}
          className={cn("flex items-center justify-between gap-8 p-4", { "bg-primary-100": index === 0 })}
        >
          <div>
            <Heading size="sm" className="mb-0">
              {new Date(date).toLocaleDateString("de", { weekday: "long", day: "numeric", month: "long" })}
            </Heading>
            <Label className="text-neutral-100-text-muted">
              {new Date(date).toLocaleDateString("de", { year: "numeric" })}
            </Label>
          </div>
          <Label>{new Date(date).toLocaleTimeString("de", { timeStyle: "short" })} Uhr</Label>
        </div>
      ))}
    </div>
  );
};
