"use client";

import { ComponentProps, FC, useCallback, useMemo, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../../primitives/button";
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";
import { useRouter } from "next/navigation";
import { submitApplication } from "~/server/resources/application/actions/submit-application";
import { useApplicationFormState } from "./state";

export type ApplicationFormNavigationProps = ComponentProps<"div"> & {
  verifyPath: string;
  buttonLabels: { back: string; next: string; submit: string };
};

export const ApplicationFormNavigation: FC<ApplicationFormNavigationProps> = ({
  className,
  verifyPath,
  buttonLabels,
  ...restProps
}) => {
  const { moveStep, currentStepIndex, steps } = useApplicationForm();
  const formState = useApplicationFormState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCurrentStepComplete = useMemo(() => steps[currentStepIndex]?.complete, [currentStepIndex, steps]);

  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNextClick = useCallback<NonNullable<ComponentProps<typeof Button>["onClick"]>>(async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      const success = await submitApplication(
        {
          programID: formState.program!,
          name: formState.name!,
          age: formState.age!,
          motivation: formState.motivation!,
          email: formState.email!,
        },
        formState.turnstileToken!,
      );
      setIsSubmitting(false);
      if (!success) router.replace(verifyPath);
      router.replace(verifyPath);
    }

    moveStep(1);
  }, [formState, router, verifyPath, moveStep, isLastStep]);

  return (
    <div className={cn("flex items-center justify-between gap-2", className)} {...restProps}>
      {currentStepIndex !== 0 && (
        <Button vairant="outline" size="sm" className="gap-2" onClick={() => moveStep(-1)}>
          <ChevronLeftIcon />
          <Label>{buttonLabels.back}</Label>
        </Button>
      )}
      <Button
        disabled={!isCurrentStepComplete}
        vairant="filled"
        size="sm"
        className={cn("w-full justify-center gap-2 disabled:opacity-30")}
        onClick={handleNextClick}
      >
        {isLastStep && isSubmitting ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <>
            <Label>{isLastStep ? buttonLabels.submit : buttonLabels.next}</Label>
            <ChevronRightIcon />
          </>
        )}
      </Button>
    </div>
  );
};
