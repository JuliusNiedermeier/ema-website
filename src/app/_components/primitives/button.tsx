import { ComponentProps, FC } from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { cn } from "~/app/_utils/cn";
import { InteractionBubble } from "../compounds/interaction-bubble";

export type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof variants> & {
    asChild?: boolean;
    href?: ComponentProps<typeof Link>["href"] | undefined;
    external?: boolean;
  };

const variants = cva("group px-8 rounded-full flex items-center w-min whitespace-nowrap", {
  variants: {
    size: {
      lg: "h-24 px-16",
      md: "h-16 px-10",
      sm: "h-10 px-6",
    },
    vairant: {
      filled: "bg-primary-900 text-neutral-900-text",
      outline: "border",
    },
    disabled: {
      true: "pointer-events-none text-neutral-900-text-muted",
    },
  },
  defaultVariants: { size: "md", vairant: "filled" },
});

export const Button: FC<ButtonProps> = ({
  className,
  children,
  asChild,
  size,
  vairant,
  href,
  external,
  disabled,
  ...restProps
}) => {
  if (asChild) {
    return (
      <Slot className={cn(variants({ size, vairant, disabled }), className)} {...restProps}>
        {children}
      </Slot>
    );
  }

  if (href) {
    return (
      <Link
        href={href}
        target={external ? "_blank" : undefined}
        className={cn(variants({ size, vairant, disabled }), className)}
        {...(restProps as Omit<ComponentProps<typeof Link>, "href">)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(variants({ size, vairant, disabled }), className)} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

export type ButtonInteractionBubbleProps = ComponentProps<typeof InteractionBubble> & {};

export const ButtonInteractionBubble: FC<ButtonInteractionBubbleProps> = ({ className, ...restProps }) => {
  return <InteractionBubble className={cn("group-hover:ml-4", className)} {...restProps} />;
};
