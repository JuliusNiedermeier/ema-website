import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

type ValidHeadingTag = "h1" | "h2" | "h3";

type HeadingVariantProps = VariantProps<typeof variants>;

export type HeadingProps = ComponentProps<ValidHeadingTag> &
  HeadingVariantProps & {
    tag?: ValidHeadingTag;
    asChild?: boolean;
  };

const variants = cva("font-sans", {
  variants: {
    size: {
      lg: "text-heading-lg my-4",
      sm: "text-heading-sm my-4",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

const headingSizeTagMap: Record<NonNullable<HeadingVariantProps["size"]>, ValidHeadingTag> = {
  lg: "h1",
  sm: "h2",
};

export const Heading: FC<HeadingProps> = ({ className, children, size, tag, asChild, ...restProps }) => {
  const Component = asChild ? Slot : tag || headingSizeTagMap[size || "lg"];

  return (
    <Component className={cn(variants({ size }), className)} {...restProps}>
      {children}
    </Component>
  );
};

export type ParagraphProps = ComponentProps<"p"> & {
  asChild?: boolean;
};

export const Paragraph: FC<ParagraphProps> = ({ className, children, asChild, ...restProps }) => {
  const Component = asChild ? Slot : "p";
  return (
    <Component className={cn("text-paragraph my-2 font-serif", className)} {...restProps}>
      {children}
    </Component>
  );
};

export type LabelProps = ComponentProps<"span"> & { asChild?: boolean };

export const Label: FC<LabelProps> = ({ className, children, asChild, ...restProps }) => {
  const Component = asChild ? Slot : "span";
  return (
    <Component className={cn("text-label", className)} {...restProps}>
      {children}
    </Component>
  );
};
