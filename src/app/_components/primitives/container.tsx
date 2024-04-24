import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC, PropsWithChildren } from "react";
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
      medium: "max-w-[calc(100vw-12px*2)] sm:max-w-[min(1920px,calc(100vw-8vw*2))]",
      narrow: "max-w-[calc(100vw-12px*2)] sm:max-w-[min(800px,calc(100vw-8vw*2))]",
    },
  },
  defaultVariants: { width: "medium" },
});

export const Container: FC<ContainerProps> = ({ asChild, width, className, children, ...restProps }) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component className={cn(variants({ width }), className)} {...restProps}>
      {children}
    </Component>
  );
};
