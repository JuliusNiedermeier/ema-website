import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type CardProps = ComponentProps<"div"> & {};

export const Card: FC<CardProps> = ({ className, children, ...restProps }) => {
  return (
    <div className={cn("rounded-2xl p-8 bg-neutral-200", className)} {...restProps}>
      {children}
    </div>
  );
};
