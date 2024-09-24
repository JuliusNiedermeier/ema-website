import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type GradientStrokeProps = Omit<ComponentProps<"div">, "children"> & {};

export const GradientStroke: FC<GradientStrokeProps> = ({ className, ...restProps }) => {
  return <div className={cn("h-32 w-px bg-gradient-to-b from-transparent to-primary-900", className)} {...restProps} />;
};
