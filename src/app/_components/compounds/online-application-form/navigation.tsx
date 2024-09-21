"use client";

import { ComponentProps, FC, useCallback, useMemo, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../../primitives/button";
import { Loader2Icon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useForm } from "./provider";
import { useRouter } from "next/navigation";
import { submitApplication } from "~/server/resources/application/actions/submit-application";
import { useApplicationFormState } from "./state";

export type FormNavigationProps = ComponentProps<"div"> & {
  verifyPath: string;
  buttonLabels: { back: string; next: string; submit: string; start: string };
};

export const FormNavigation: FC<FormNavigationProps> = ({ className, verifyPath, buttonLabels, ...restProps }) => {
  const { moveStep, currentStepIndex, steps } = useForm();
  const formState = useApplicationFormState();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isCurrentStepComplete = useMemo(() => steps[currentStepIndex]?.complete, [currentStepIndex, steps]);

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  const handleNextClick = useCallback<NonNullable<ComponentProps<typeof Button>["onClick"]>>(async () => {
    if (isLastStep) {
      setIsSubmitting(true);
      const success = await submitApplication(
        {
          programID: formState.program!,
          name: formState.name!,
          age: formState.age!,
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
    <div className={cn("flex gap-4 bg-primary-900 rounded-full ring-[1rem] ring-primary-900", className)} {...restProps}>
      {!isFirstStep && (
        <Button
          className="flex-1 justify-center border-neutral-900-text text-neutral-900-text"
          vairant="outline"
          onClick={() => moveStep(-1)}
        >
          <Label>{buttonLabels.back}</Label>
        </Button>
      )}
      <Button
        className="flex-1 justify-center bg-primary-100 text-primary-100-text disabled:opacity-30"
        disabled={!isCurrentStepComplete}
        onClick={handleNextClick}
      >
        {isLastStep && isSubmitting ? (
          <Loader2Icon className="animate-spin" />
        ) : (
          <Label>{isFirstStep ? buttonLabels.start : isLastStep ? buttonLabels.submit : buttonLabels.next}</Label>
        )}
      </Button>
    </div>
  );
};
