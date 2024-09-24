import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type GradientStrokeIconProps = ComponentProps<"div"> & {};

export const GradientStrokeIcon: FC<GradientStrokeIconProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex flex-col items-center", className)} {...restProps} />;
};
