"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ComponentProps, FC } from "react";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { cn } from "~/app/_utils/cn";
import { useOnPageNavigationChecker } from "../../on-page-navigation-checker";

export type FormLeaveButtonProps = Omit<ComponentProps<"button">, "children" | "onClick"> & {};

export const FormLeaveButton: FC<FormLeaveButtonProps> = ({ className, ...restProps }) => {
  const hasNavigated = useOnPageNavigationChecker();
  const { back, replace } = useRouter();

  return (
    <button className={cn("", className)} onClick={() => (hasNavigated ? back() : replace("/"))} {...restProps}>
      <IconChip className="bg-neutral-100/10">
        <ArrowLeftIcon />
      </IconChip>
    </button>
  );
};
