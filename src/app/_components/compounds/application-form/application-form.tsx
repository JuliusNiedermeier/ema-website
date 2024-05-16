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

export type ApplicationFormProps = ComponentProps<"div"> & {};

export const ApplicationForm: FC<ApplicationFormProps> = ({ className }) => {
  const { currentStepIndex, steps } = useApplicationForm();

  return (
    <div className={cn("flex gap-16", className)}>
      <StepList className="sticky top-36 hidden h-min md:block">
        {steps.map((step, index) => (
          <Step key={step.ID} className={cn({ "opacity-30": !step.complete })}>
            <StepIcon status={step.complete ? "complete" : "pending"}>{step.icon}</StepIcon>
            {index < steps.length - 1 && <StepLine status={step.complete ? "complete" : "pending"} />}
            <StepContent>
              <StepContentStepNumber>Schritt {index + 1}</StepContentStepNumber>
              <Label>{step.ID}</Label>
              <Paragraph className="m-0 max-w-96 overflow-hidden text-ellipsis whitespace-nowrap">John Doe</Paragraph>
              <StepContentStatus>{step.complete ? "Abgeschlossen" : "Ausstehend"}</StepContentStatus>
            </StepContent>
          </Step>
        ))}
      </StepList>
      <div>{steps[currentStepIndex]?.component}</div>
    </div>
  );
};
