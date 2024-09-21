"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { useForm } from "./provider";

export type FormCarouselProps = ComponentProps<"div"> & {};

export const FormCarousel: FC<FormCarouselProps> = ({ className, ...restProps }) => {
  const { currentStepIndex, steps } = useForm();

  return (
    <div className={cn("", className)} {...restProps}>
      {steps[currentStepIndex]?.component}
    </div>
  );
};
