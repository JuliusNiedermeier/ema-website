"use client";

import { ComponentProps, FC, useCallback, useMemo } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../../primitives/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";

export type ApplicationFormNavigationProps = ComponentProps<"div"> & {};

export const ApplicationFormNavigation: FC<ApplicationFormNavigationProps> = ({ className, ...restProps }) => {
  const { moveStep, currentStepIndex, steps } = useApplicationForm();

  const isCurrentStepComplete = useMemo(() => steps[currentStepIndex]?.complete, [currentStepIndex, steps]);

  const handleNextClick = useCallback<NonNullable<ComponentProps<typeof Button>["onClick"]>>(() => {
    if (currentStepIndex === steps.length - 1) alert("Complete");
    moveStep(1);
  }, [currentStepIndex, steps]);

  return (
    <div className={cn("flex items-center justify-between gap-2", className)} {...restProps}>
      {currentStepIndex !== 0 && (
        <Button vairant="outline" size="sm" className="gap-2" onClick={() => moveStep(-1)}>
          <ChevronLeftIcon />
          <Label>Zurück</Label>
        </Button>
      )}
      <Button
        disabled={!isCurrentStepComplete}
        vairant="filled"
        size="sm"
        className={cn("w-full justify-center gap-2 disabled:opacity-30")}
        onClick={handleNextClick}
      >
        <Label>Weiter</Label>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};
