import { ComponentProps, FC } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";

export type ButtonProps = ComponentProps<typeof Link> &
  VariantProps<typeof variants> & {
    asChild?: boolean;
  };

const variants = cva("group px-8 rounded-full flex items-center w-min whitespace-nowrap", {
  variants: {
    size: {
      lg: "h-24 px-16",
      md: "h-16 px-10",
      sm: "h-10 px-6",
    },
    vairant: {
      filled: "bg-primary-900 text-neutral-100",
      outline: "border",
    },
  },
  defaultVariants: { size: "md", vairant: "filled" },
});

export const Button: FC<ButtonProps> = ({ className, children, asChild, size, vairant, ...restProps }) => {
  const Component = asChild ? Slot : Link;

  return (
    <Component className={cn(variants({ size, vairant }), className)} {...restProps}>
      {children}
    </Component>
  );
};
