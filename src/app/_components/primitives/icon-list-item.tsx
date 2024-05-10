import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

const variants = cva("flex gap-4", {
  variants: {
    align: {
      center: "items-center",
      top: "items-start",
    },
  },
  defaultVariants: {
    align: "center",
  },
});

export type IconListItemProps = ComponentProps<"div"> & VariantProps<typeof variants>;

export const IconListItem: FC<IconListItemProps> = ({ className, ...restProps }) => {
  const variantClass = variants(restProps);

  return <div className={cn(variantClass, className)} {...restProps} />;
};
