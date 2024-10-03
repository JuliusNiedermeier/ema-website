import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type TabListProps = ComponentProps<"div"> & {};

export const TabList: FC<TabListProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn(
        "flex h-12 items-stretch gap-1 overflow-x-auto rounded-full border border-neutral-900/10 bg-neutral-100 p-1",
        className,
      )}
      {...restProps}
    />
  );
};

export type TabProps = ComponentProps<"div"> & {
  active?: boolean;
  interactive?: boolean;
  asChild?: Boolean;
};

export const Tab: FC<TabProps> = ({ className, active, interactive, asChild, ...restProps }) => {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(
        "flex h-full flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-2 text-center",
        {
          "bg-primary-900 text-neutral-900-text": active,
          "cursor-pointer select-none transition-colors hover:bg-neutral-300": interactive,
          "hover:bg-primary-800": interactive && active,
        },
        className,
      )}
      {...restProps}
    />
  );
};
