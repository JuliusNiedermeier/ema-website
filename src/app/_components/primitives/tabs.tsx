import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type TabListProps = ComponentProps<"div"> & {};

export const TabList: FC<TabListProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn("flex items-end gap-1 overflow-x-auto rounded-full bg-neutral-400 p-1", className)}
      {...restProps}
    />
  );
};

export type TabProps = ComponentProps<"div"> & {
  active?: boolean;
  interactive?: boolean;
};

export const Tab: FC<TabProps> = ({ className, active, interactive, ...restProps }) => {
  return (
    <div
      className={cn(
        "flex flex-1 items-center gap-2 whitespace-nowrap rounded-full px-6 justify-center py-2 text-center",
        {
          "bg-primary-900 text-neutral-900-text": active,
          "cursor-pointer select-none transition-colors hover:bg-neutral-200 data-[active]:hover:bg-primary-800":
            interactive,
        },
        className,
      )}
      {...restProps}
    />
  );
};
