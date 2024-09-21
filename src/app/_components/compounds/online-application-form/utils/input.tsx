import { ComponentProps, FC } from "react";
import { Input } from "~/app/_components/primitives/input";
import { cn } from "~/app/_utils/cn";

export type FormInputProps = ComponentProps<typeof Input> & {};

export const FormInput: FC<FormInputProps> = ({ className, ...restProps }) => {
  return (
    <Input
      className={cn(
        "w-full border-neutral-900-text-muted bg-transparent rounded-3xl px-8 py-6 text-heading-sm text-neutral-900-text outline-none ring-neutral-100/20 focus:bg-neutral-100/5 focus:ring-4",
        className,
      )}
      {...restProps}
    />
  );
};
