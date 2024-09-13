import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type SectionProps = ComponentProps<"div"> & {
  connect?: "top" | "bottom" | "both";
};

export const Section: FC<SectionProps> = ({ className, connect = "both", ...restProps }) => {
  return (
    <div
      className={cn(
        "rounded-t-[2rem] ring-2 ring-neutral-400 sm:rounded-t-[4rem]",
        { "-mt-[4rem]": connect === "top" || connect === "both" },
        { "pb-[4rem]": connect === "bottom" || connect === "both" },
        className,
      )}
      {...restProps}
    />
  );
};
