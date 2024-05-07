"use client";

import { useScroll } from "framer-motion";
import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { useProgress } from "./progress-provider";
import { Slot } from "@radix-ui/react-slot";

export type ScrollProgressProps = ComponentProps<"div"> & {
  asChild?: boolean;
  axis?: "x" | "y";
};

export const ScrollProgress: FC<ScrollProgressProps> = ({ className, asChild, axis = "x", ...restProps }) => {
  const { setProgress } = useProgress();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ axis, container: containerRef });

  scrollXProgress.on("change", setProgress);

  const Component = asChild ? Slot : "div";

  return <Component ref={containerRef} className={cn("", className)} {...restProps} />;
};
