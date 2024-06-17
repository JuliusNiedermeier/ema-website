"use client";

import { ComponentProps, FC } from "react";
import {
  Step,
  StepContent,
  StepContentStatus,
  StepContentStepNumber,
  StepIcon,
  StepLine,
  StepList,
} from "../../primitives/step-list";
import { cn } from "~/app/_utils/cn";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";

export type ApplicationFormProgressProps = ComponentProps<"div"> & {};

export const ApplicationFormProgress: FC<ApplicationFormProgressProps> = ({ className, ...restProps }) => {
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
            <StepContentStepNumber>Schritt {index + 1}</StepContentStepNumber>
            <Label>{step.ID}</Label>
            <StepContentStatus>{step.complete ? "Abgeschlossen" : "Ausstehend"}</StepContentStatus>
          </StepContent>
        </Step>
      ))}
    </StepList>
  );
};
