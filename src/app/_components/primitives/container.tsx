import { ComponentProps, FC, forwardRef, PropsWithChildren } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "~/app/_utils/cn";

export type ContainerProps = ComponentProps<"div"> &
  VariantProps<typeof variants> &
  PropsWithChildren<{
    asChild?: boolean;
  }>;

const variants = cva("w-full mx-auto", {
  variants: {
    width: {
      wide: "max-w-[calc(100vw-6px*2)] sm:max-w-[min(2200px,calc(100vw-2vw*2))]",
      medium: "max-w-[calc(100vw-0.75rem*2)] sm:max-w-[min(1920px,calc(100vw-8vw*2))]", // 0.75rem = p-3
      narrow: "max-w-[calc(100vw-0.75rem*2)] sm:max-w-[min(800px,calc(100vw-8vw*2))]", // 0.75rem = p-3
    },
  },
  defaultVariants: { width: "medium" },
});

export const Container: FC<ContainerProps> = forwardRef(
  ({ asChild, width, className, children, ...restProps }, ref) => {
    const Component = asChild ? Slot : "div";

    return (
      <Component ref={ref} className={cn(variants({ width }), className)} {...restProps}>
        {children}
      </Component>
    );
  },
);
