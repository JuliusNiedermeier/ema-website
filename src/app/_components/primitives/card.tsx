import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type CardProps = ComponentProps<"div"> & {};

export const Card: FC<CardProps> = ({ className, children, ...restProps }) => {
  return (
    <div className={cn("rounded-2xl bg-neutral-200 p-8", className)} {...restProps}>
      {children}
    </div>
  );
};
