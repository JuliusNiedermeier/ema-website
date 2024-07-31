import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "./typography";

export type StepVariant = "outlined" | "filled";

export type StepListProps = ComponentProps<"div"> & {};

export const StepList: FC<StepListProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex flex-col gap-4", className)} {...restProps} />;
};

export type StepProps = ComponentProps<"div"> & {};

export const Step: FC<StepProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn("grid grid-cols-[min-content_1fr] grid-rows-[min-content_1fr] gap-4", className)}
      {...restProps}
    />
  );
};

const stepIconVariants = cva("grid place-content-center col-start-1 row-start-1 h-12 w-12 rounded-full mt-1", {
  variants: {
    variant: {
      outlined: "border border-neutral-900",
      filled: "bg-primary-900 text-primary-900-text",
    } satisfies Record<StepVariant, string>,
  },
});

export type StepIconProps = ComponentProps<"div"> & VariantProps<typeof stepIconVariants>;

export const StepIcon: FC<StepIconProps> = ({ className, variant, ...restProps }) => {
  return <div className={cn(stepIconVariants({ variant }), className)} {...restProps} />;
};

export type StepLineProps = ComponentProps<"div">;

export const StepLine: FC<StepLineProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn("col-start-1 row-start-2 min-h-12 w-px justify-self-center bg-neutral-900", className)}
      {...restProps}
    />
  );
};

export type StepContentProps = ComponentProps<"div"> & {};

export const StepContent: FC<StepContentProps> = ({ className, ...restProps }) => {
  return <div className={cn("col-start-2 row-span-2 row-start-1", className)} {...restProps} />;
};

export type StepContentStatusProps = ComponentProps<typeof Label> & {};

export const StepContentStatus: FC<StepContentStatusProps> = ({ className, ...restProps }) => {
  return <Label className={cn("block text-[0.8rem]", className)} {...restProps} />;
};
