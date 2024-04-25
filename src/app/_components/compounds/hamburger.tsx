"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type HamburgerProps = ComponentProps<"button"> & {
  open: boolean;
  onOpenChange?: (open: boolean) => any;
};

const classes = {
  top: { base: "duration-[200ms]", open: "rotate-[135deg] translate-y-full" },
  center: { base: "duration-[150ms]", open: "rotate-45" },
  bottom: { base: "duration-[100ms]", open: "translate-y-full opacity-0" },
};

export const Hamburger: FC<HamburgerProps> = ({ className, open, onOpenChange, ...restProps }) => {
  return (
    <button
      className={cn("group grid h-6 w-6 grid-rows-3 items-center p-1", className)}
      onClick={() => onOpenChange?.(!open)}
      {...restProps}
    >
      {Object.keys(classes).map((key) => (
        <div
          key={key}
          className={cn(
            "grid h-full w-full flex-1 items-center transition-all",
            classes[key as keyof typeof classes].base,
            open && classes[key as keyof typeof classes].open,
          )}
        >
          <div className="h-[2px] w-full bg-neutral-900" />
        </div>
      ))}
    </button>
  );
};
