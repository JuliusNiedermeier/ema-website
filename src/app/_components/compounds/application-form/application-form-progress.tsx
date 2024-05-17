"use client";

import { ComponentProps, FC, ReactNode } from "react";
import {
  Step,
  StepContent,
  StepContentStatus,
  StepContentStepNumber,
  StepIcon,
  StepLine,
  StepList,
  StepStatus,
} from "../../primitives/step-list";
import { cn } from "~/app/_utils/cn";
import { Label, Paragraph } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";

type Step = {
  ID: string;
  component: ReactNode;
  icon: ReactNode;
  complete: boolean;
};

export type ApplicationFormProgressProps = ComponentProps<"div"> & {};

export const ApplicationFormProgress: FC<ApplicationFormProgressProps> = ({ className, ...restProps }) => {
  const { currentStepIndex, steps } = useApplicationForm();

  return (
    <StepList className={cn("", className)} {...restProps}>
      {steps.map((step, index) => {
        const status: StepStatus = currentStepIndex === index ? "active" : step.complete ? "complete" : "pending";
        return (
          <Step key={step.ID} className={cn({ "opacity-30": !step.complete })}>
            <StepIcon status={status}>{step.icon}</StepIcon>
            {index < steps.length - 1 && <StepLine status={status} />}
            <StepContent>
              <StepContentStepNumber>Schritt {index + 1}</StepContentStepNumber>
              <Label>{step.ID}</Label>
              <Paragraph className="m-0 max-w-96 overflow-hidden text-ellipsis whitespace-nowrap">John Doe</Paragraph>
              <StepContentStatus>{step.complete ? "Abgeschlossen" : "Ausstehend"}</StepContentStatus>
            </StepContent>
          </Step>
        );
      })}
    </StepList>
  );
};
