import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type ChipProps = ComponentProps<"div"> & {};

export const Chip: FC<ChipProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn("text-sm w-min whitespace-nowrap rounded-full bg-primary-100 px-4 py-1", className)}
      {...restProps}
    />
  );
};
