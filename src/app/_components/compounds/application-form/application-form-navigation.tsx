"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../../primitives/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";

export type ApplicationFormNavigationProps = ComponentProps<"div"> & {};

export const ApplicationFormNavigation: FC<ApplicationFormNavigationProps> = ({ className, ...restProps }) => {
  const { moveStep } = useApplicationForm();

  return (
    <div className={cn("flex items-center justify-between gap-2", className)} {...restProps}>
      <Button vairant="outline" size="sm" className="gap-2" onClick={() => moveStep(-1)}>
        <ChevronLeftIcon />
        <Label>Zurück</Label>
      </Button>
      <Button
        vairant="filled"
        size="sm"
        className={cn("w-full justify-center gap-2 disabled:opacity-30")}
        onClick={() => moveStep(1)}
      >
        <Label>Weiter</Label>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
