"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { useForm } from "./provider";

export type FormProgressIndicatorProps = ComponentProps<"div"> & {};

export const FormProgressIndicator: FC<FormProgressIndicatorProps> = ({ className, ...restProps }) => {
  const { currentStepIndex, steps } = useForm();

  return (
    <div className={cn("flex items-center gap-2", className)} {...restProps}>
      {steps.map((step, index) => (
        <div key={index} className={cn("h-1 w-8 bg-primary-100/20", { "bg-primary-100": currentStepIndex >= index })} />
      ))}
    </div>
  );
};
