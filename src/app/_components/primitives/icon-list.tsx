import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type IconListProps = ComponentProps<"div"> & {};

export const IconList: FC<IconListProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex flex-col gap-2", className)} {...restProps} />;
};

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

export type IconListItemIconProps = ComponentProps<"div"> & {};

export const IconListItemIcon: FC<IconListItemIconProps> = ({ className, ...restProps }) => {
  return <div className={cn("shrink-0", className)} {...restProps} />;
};

export type IconListItemContentProps = ComponentProps<"div"> & {};

export const IconListItemContent: FC<IconListItemContentProps> = ({ className, ...restProps }) => {
  return <div className={cn("self-center", className)} {...restProps} />;
};
