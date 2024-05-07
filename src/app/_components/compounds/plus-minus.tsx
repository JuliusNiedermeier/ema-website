"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type PlusMinusProps = ComponentProps<"div"> & {
  open: boolean;
};

const baseClassName = "absolute top-1/2 h-px w-full translate-y-1/2 bg-neutral-900 transition-all";

export const PlusMinus: FC<PlusMinusProps> = ({ className, open, ...restProps }) => {
  return (
    <div className={cn("group relative h-4 w-4", className)} {...restProps}>
      <div className={cn(baseClassName, "rotate-0 delay-300 duration-300", { "rotate-180": open })} />
      <div className={cn(baseClassName, "rotate-90 duration-300", { "rotate-180": open })} />
    </div>
  );
};
