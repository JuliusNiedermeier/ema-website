import { VariantProps, cva } from "class-variance-authority";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "./typography";

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
    status: {
      pending: "border border-neutral-900",
      active: "border border-primary-900 text-primary-900",
      complete: "bg-primary-900 text-primary-900-text",
    },
  },
});

export type StepIconProps = ComponentProps<"div"> & VariantProps<typeof stepIconVariants>;

export const StepIcon: FC<StepIconProps> = ({ className, status, ...restProps }) => {
  return <div className={cn(stepIconVariants({ status }), className)} {...restProps} />;
};

const stepLineVariants = cva("justify-self-center col-start-1 row-start-2 min-h-12 w-px", {
  variants: {
    status: {
      pending: "bg-neutral-900",
      active: "bg-neutral-900",
      complete: "bg-primary-900",
    },
  },
});

export type StepLineProps = ComponentProps<"div"> & VariantProps<typeof stepLineVariants>;

export const StepLine: FC<StepLineProps> = ({ className, status, ...restProps }) => {
  return <div className={cn(stepLineVariants({ status }), className)} {...restProps} />;
};

export type StepContentProps = ComponentProps<"div"> & {};

export const StepContent: FC<StepContentProps> = ({ className, ...restProps }) => {
  return <div className={cn("col-start-2 row-span-2 row-start-1", className)} {...restProps} />;
};

export type StepContentStepNumberProps = ComponentProps<typeof Label> & {};

export const StepContentStepNumber: FC<StepContentStepNumberProps> = ({ className, ...restProps }) => {
  return <Label className={cn("block text-[0.8rem] text-neutral-100-text-muted", className)} {...restProps} />;
};

export type StepContentStatusProps = ComponentProps<typeof Label> & {};

export const StepContentStatus: FC<StepContentStatusProps> = ({ className, ...restProps }) => {
  return <Label className={cn("block text-[0.8rem]", className)} {...restProps} />;
};
