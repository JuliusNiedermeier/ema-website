"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../../primitives/card";
import { BadgeInfoIcon } from "lucide-react";
import { Label, Paragraph } from "../../primitives/typography";
import { Button } from "../../primitives/button";
import { useApplicationFormState } from "./state";

export type ApplicationFormInfoPopupProps = ComponentProps<"div"> & {
  heading: string;
  description: string;
  dismissLabel: string;
};

export const ApplicationFormInfoPopup: FC<ApplicationFormInfoPopupProps> = ({
  className,
  heading,
  description,
  dismissLabel,
  ...restProps
}) => {
  const { showInfo, setShowInfo } = useApplicationFormState();

  return (
    <div
      className={cn("grid grid-rows-[0fr] overflow-hidden opacity-0 transition-all", {
        "opacity-1 grid-rows-[1fr] py-4": showInfo,
      })}
      {...restProps}
    >
      <Card
        className={cn(
          "flex min-h-0 flex-col gap-4 border border-neutral-400 bg-primary-900 px-0 py-6 transition-[padding]",
          {
            "p-0": !showInfo,
          },
        )}
      >
        <div className="flex items-center gap-4 px-8">
          <BadgeInfoIcon size="24" className="shrink-0 text-primary-900-text" />
          <Label className="text-neutral-900-text">{heading}</Label>
          <Button
            size="sm"
            vairant="outline"
            className="ml-auto text-neutral-900-text"
            onClick={() => setShowInfo(false)}
          >
            <Label>{dismissLabel}</Label>
          </Button>
        </div>
        <div className="h-px w-full bg-neutral-900-text-muted" />
        <Paragraph className={cn("my-0 px-8 text-neutral-900-text-muted")}>{description}</Paragraph>
      </Card>
    </div>
  );
};
