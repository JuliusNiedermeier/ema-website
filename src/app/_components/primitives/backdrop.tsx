"use client";

import { ComponentProps, FC, useEffect } from "react";
import { cn } from "~/app/_utils/cn";
import { useBodyScrollLock } from "~/app/_utils/use-body-scroll-lock";

export type BackdropProps = ComponentProps<"div"> & {
  visible: boolean;
};

export const Backdrop: FC<BackdropProps> = ({ className, visible, ...restProps }) => {
  const lockBodyScroll = useBodyScrollLock();

  useEffect(() => {
    lockBodyScroll(visible);
  }, [lockBodyScroll, visible]);

  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-0 left-0 right-0 top-0 bg-neutral-900/60 opacity-0 transition-opacity",
        { "pointer-events-auto opacity-100": visible },
        className,
      )}
      {...restProps}
    />
  );
};
