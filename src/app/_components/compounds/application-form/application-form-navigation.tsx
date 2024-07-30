"use client";

import { ComponentProps, FC, useCallback, useMemo } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../../primitives/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useApplicationForm } from "./application-form-provider";
import { useRouter } from "next/navigation";
import { submitApplication } from "~/server/resources/application/actions/submit-application";
import { useApplicationFormState } from "./state";

export type ApplicationFormNavigationProps = ComponentProps<"div"> & {
  verifyPath: string;
};

export const ApplicationFormNavigation: FC<ApplicationFormNavigationProps> = ({
  className,
  verifyPath,
  ...restProps
}) => {
  const { moveStep, currentStepIndex, steps } = useApplicationForm();
  const formState = useApplicationFormState();
  const router = useRouter();

  const isCurrentStepComplete = useMemo(() => steps[currentStepIndex]?.complete, [currentStepIndex, steps]);

  const handleNextClick = useCallback<NonNullable<ComponentProps<typeof Button>["onClick"]>>(async () => {
    if (currentStepIndex === steps.length - 1) {
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
      if (!success) router.replace(verifyPath);
      router.replace(verifyPath);
    }

    moveStep(1);
  }, [currentStepIndex, steps.length, formState, router, verifyPath, moveStep]);

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
