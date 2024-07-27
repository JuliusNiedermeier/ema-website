"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Chip } from "../../primitives/chip";
import { Label } from "../../primitives/typography";
import { useCheckupForm } from "./checkup-form-provider";

export type ResultCounterProps = ComponentProps<typeof Chip> & {};

export const ResultCounter: FC<ResultCounterProps> = ({ className, ...restProps }) => {
  const { results } = useCheckupForm();

  return (
    <Chip className={cn("", className)} {...restProps}>
      <Label>{results.length} Ergebnisse</Label>
    </Chip>
  );
};
