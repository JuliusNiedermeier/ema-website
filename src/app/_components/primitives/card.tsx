import { ComponentProps, FC, forwardRef } from "react";
import { cn } from "~/app/_utils/cn";

export type CardProps = ComponentProps<"div"> & {};

export const Card: FC<CardProps> = forwardRef(({ className, children, ...restProps }, ref) => {
  return (
    <div ref={ref} className={cn("rounded-2xl bg-neutral-200 p-8", className)} {...restProps}>
      {children}
    </div>
  );
});

Card.displayName = "Card";
