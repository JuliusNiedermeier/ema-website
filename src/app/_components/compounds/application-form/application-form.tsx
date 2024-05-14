"use client";

import { ComponentProps, FC, ReactNode, useCallback, useEffect, useMemo } from "react";
import { cn } from "~/app/_utils/cn";
import { useProgress } from "../../primitives/progress-provider";
import { useApplicationFormState } from "./state";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { clamp } from "framer-motion";
import { ProgramsStep, ProgramsStepProps } from "./steps/programs";
import { NameStep } from "./steps/name";
import { AgeStep } from "./steps/age";
import { Button } from "../../primitives/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Label } from "../../primitives/typography";

type FormStepConfig = {
  valid: boolean;
  content: ReactNode;
};

export type ApplicationFormProps = ComponentProps<"div"> & {
  programs: ProgramsStepProps["programs"];
};

export const ApplicationForm: FC<ApplicationFormProps> = ({ className, programs, ...restProps }) => {
  const { setProgress } = useProgress();
  const { program, name, age } = useApplicationFormState();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const steps = useMemo<FormStepConfig[]>(
    () => [
      { showNavigationButtons: false, valid: Boolean(program), content: <ProgramsStep programs={programs} /> },
      { showNavigationButtons: true, valid: Boolean(program) && Boolean(name), content: <NameStep /> },
      { showNavigationButtons: true, valid: Boolean(program) && Boolean(name) && Boolean(age), content: <AgeStep /> },
    ],
    [program, name, age, programs],
  );

  const navigateToStep = useCallback(
    (step: number, method: "push" | "replace" = "push") => {
      if (step < 0 || step > steps.length - 1) return;
      const query = new URLSearchParams(Array.from(searchParams.entries()));
      query.set("step", step.toString());
      router[method](`${pathname}?${query.toString()}`);
    },
    [router, pathname, searchParams, steps],
  );

  const currentStepIndex = useMemo(() => {
    const parsedStep = parseInt(searchParams.get("step") ?? "0");
    const clampedStep = clamp(0, steps.length - 1, parsedStep);
    if (clampedStep !== parsedStep) navigateToStep(clampedStep);
    return clampedStep;
  }, [searchParams]);

  const currentStep = useMemo(() => steps[currentStepIndex], [steps, currentStepIndex]);
  const progress = useMemo(() => (1 / steps.length) * (currentStepIndex + 1), [steps.length, currentStepIndex]);

  useEffect(() => setProgress(progress), [progress]);

  const next = () => navigateToStep(currentStepIndex + 1);
  const previous = () => navigateToStep(currentStepIndex - 1);

  return (
    <div className={cn("flex flex-col gap-4", className)} {...restProps}>
      <div className="mt-16 flex-1">{currentStep.content}</div>

      <div
        className={cn(
          "sticky bottom-4 flex items-center justify-between gap-4 overflow-hidden rounded-full bg-neutral-200 p-2",
        )}
      >
        <Button vairant="outline" size="sm" className="gap-2" onClick={previous}>
          <ChevronLeftIcon />
          <Label>Zurück</Label>
        </Button>
        <Button
          vairant="filled"
          size="sm"
          className={cn("w-full justify-center gap-2 disabled:opacity-30")}
          onClick={next}
          disabled={!currentStep.valid}
        >
          <Label>Weiter</Label>
          <ChevronRightIcon />
        </Button>
      </div>
    </div>
  );
};
