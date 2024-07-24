import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

const iconChipVariants = cva("grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full", {
  variants: {
    on: {
      light: "bg-primary-900 text-primary-900-text",
      dark: "bg-primary-100 text-primary-100-text",
    },
  },
  defaultVariants: {
    on: "light",
  },
});

export type IconChipProps = ComponentProps<"div"> & VariantProps<typeof iconChipVariants> & {};

export const IconChip: FC<IconChipProps> = ({ className, children, on, ...restProps }) => {
  return (
    <div
      className={cn(
        "grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full",
        iconChipVariants({ on }),
        className,
      )}
      {...restProps}
    >
      {children}
    </div>
  );
};
