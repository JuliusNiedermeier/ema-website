"use client";

import { ComponentProps, FC, useEffect } from "react";
import { cn } from "~/app/_utils/cn";
import { useSiteHeader } from "./site-header-context";
import { usePathname } from "next/navigation";
import { Backdrop } from "../../primitives/backdrop";
import { Container } from "../../primitives/container";
import { XIcon } from "lucide-react";

export type MenuShellProps = ComponentProps<"div"> & {};

export const MenuShell: FC<MenuShellProps> = ({ className, children, ...restProps }) => {
  const { open, setOpen } = useSiteHeader();

  const pathName = usePathname();

  useEffect(() => setOpen(false), [pathName, setOpen]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 w-full">
      <div
        className={cn(
          "pointer-events-auto z-10 max-h-[70vh] overflow-hidden rounded-b-3xl bg-neutral-200",
          "transition-[clip-path]",
          className,
        )}
        style={{ clipPath: open ? "rect(0 100% 100% 0)" : "rect(0 100% 0 0)" }}
        {...restProps}
      >
        {children}
      </div>
      <Container className="-z-10 mt-[2vh] flex items-center justify-center">
        <div
          className={cn(
            "pointer-events-auto cursor-pointer rounded-full bg-neutral-200 p-4 text-neutral-200-text transition-all hover:rotate-90",
            {
              "pointer-events-none translate-y-[25vh] rotate-90 opacity-0": !open,
            },
          )}
          onClick={() => setOpen(false)}
        >
          <XIcon size={32} />
        </div>
      </Container>
    </div>
  );
};

export const MenuBackdrop: FC = () => {
  const { open, setOpen } = useSiteHeader();
  return <Backdrop visible={open} onClick={() => setOpen(false)} />;
};
