import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type InputProps = ComponentProps<"input"> & {};

export const Input: FC<InputProps> = ({ className, ...restProps }) => {
  return <input className={cn("font-serif rounded-2xl border bg-transparent px-6 py-4", className)} {...restProps} />;
};
