"use client";

import { ComponentProps, FC } from "react";
import { Step, StepContent, StepContentStatus, StepIcon, StepLine, StepList } from "../../primitives/step-list";
import { cn } from "~/app/_utils/cn";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";

export type ApplicationFormProgressProps = ComponentProps<"div"> & {
  statusLabels: { complete: string; pending: string };
};

export const ApplicationFormProgress: FC<ApplicationFormProgressProps> = ({
  className,
  statusLabels,
  ...restProps
}) => {
  const { currentStepIndex, steps, firstIncompleteStepIndex } = useApplicationForm();

  return (
    <StepList className={cn("", className)} {...restProps}>
      {steps.map((step, index) => (
        <Step
          key={step.ID}
          className={cn({
            "opacity-20":
              firstIncompleteStepIndex >= 0 && index > firstIncompleteStepIndex && index !== currentStepIndex,
          })}
        >
          <StepIcon variant={currentStepIndex >= index ? "filled" : "outlined"}>{step.icon}</StepIcon>
          {index < steps.length - 1 && <StepLine />}
          <StepContent>
            <Label className="mt-3 block">{step.title}</Label>
            <StepContentStatus>{step.complete ? statusLabels.complete : statusLabels.pending}</StepContentStatus>
          </StepContent>
        </Step>
      ))}
    </StepList>
  );
};
