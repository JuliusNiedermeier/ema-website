"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Chip } from "../../primitives/chip";
import { Label } from "../../primitives/typography";
import { useCheckupForm } from "./checkup-form-provider";

export type ResultCounterProps = ComponentProps<typeof Chip> & { singularSuffix: string; pluralSuffix: string };

export const ResultCounter: FC<ResultCounterProps> = ({ className, singularSuffix, pluralSuffix, ...restProps }) => {
  const { results } = useCheckupForm();

  return (
    <Chip className={cn("", className)} {...restProps}>
      <Label>
        {results.length} {results.length === 1 ? singularSuffix : pluralSuffix}
      </Label>
    </Chip>
  );
};
