"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { useApplicationForm } from "./application-form-provider";

export type ApplicationFormCarouselProps = ComponentProps<"div"> & {};

export const ApplicationFormCarousel: FC<ApplicationFormCarouselProps> = ({ className, ...restProps }) => {
  const { currentStepIndex, steps } = useApplicationForm();

  return (
    <div className={cn("", className)} {...restProps}>
      {steps[currentStepIndex]?.component}
    </div>
  );
};
