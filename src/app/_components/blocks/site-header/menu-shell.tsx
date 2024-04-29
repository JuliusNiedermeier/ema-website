"use client";

import { ComponentProps, FC, useEffect } from "react";
import { cn } from "~/app/_utils/cn";
import { useSiteHeader } from "./site-header-context";
import { usePathname } from "next/navigation";

export type MenuShellProps = ComponentProps<"div"> & {};

export const MenuShell: FC<MenuShellProps> = ({ className, ...restProps }) => {
  const { open, setOpen } = useSiteHeader();

  const pathName = usePathname();

  useEffect(() => setOpen(false), [pathName, setOpen]);

  return (
    <div
      className={cn(
        "absolute left-0 top-0 max-h-[80vh] w-full overflow-y-auto overflow-x-hidden rounded-b-2xl bg-neutral-200 sm:overflow-y-hidden",
        "transition-[clip-path]",
        "[&[data-menu=closed]_[data-animate]]:translate-y-8 [&_[data-animate]]:transition-transform",
        className,
      )}
      style={{ clipPath: open ? "rect(0 100% 100% 0)" : "rect(0 100% 0 0)" }}
      {...restProps}
    />
  );
};
