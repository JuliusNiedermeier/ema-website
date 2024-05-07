"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { useProgress } from "./progress-provider";

export interface ProgressBarProps extends ComponentProps<"div"> {}

export const ProgressBar: FC<ProgressBarProps> = ({ className, ...restProps }) => {
  return <div className={cn("bg-neutral-400", className)} {...restProps} />;
};

export interface ProgressBarIndicatorProps extends ComponentProps<"div"> {}

export const ProgressBarIndicator: FC<ProgressBarIndicatorProps> = ({ className, ...restProps }) => {
  const { progress } = useProgress();

  return (
    <div
      className={cn("h-px origin-left bg-neutral-100-text", className)}
      style={{ transform: `scaleX(${progress})` }}
      {...restProps}
    />
  );
};
