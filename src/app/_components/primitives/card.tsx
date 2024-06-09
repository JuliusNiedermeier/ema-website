import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC, forwardRef } from "react";
import { cn } from "~/app/_utils/cn";

export type CardProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export const Card: FC<CardProps> = forwardRef(({ className, children, asChild, ...restProps }, ref) => {
  const Component = asChild ? Slot : "div";
  return (
    <Component ref={ref} className={cn("rounded-2xl bg-neutral-200 p-8", className)} {...restProps}>
      {children}
    </Component>
  );
});

Card.displayName = "Card";
