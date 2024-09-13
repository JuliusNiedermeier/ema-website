"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { useNewsBanner } from "./news-banner/state";

export type SiteHeaderContainerProps = ComponentProps<"div"> & {};

export const SiteHeaderContainer: FC<SiteHeaderContainerProps> = ({ className, ...restProps }) => {
  const { dismissed } = useNewsBanner();

  return (
    <div
      className={cn(
        "sticky left-0 right-0 top-2 z-50 -mb-[var(--header-height)] mt-2 transition-[top]",
        { "top-12": dismissed === false },
        className,
      )}
      {...restProps}
    />
  );
};
