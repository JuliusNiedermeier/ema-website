"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Hamburger } from "../../compounds/hamburger";
import { useSiteHeader } from "./site-header-context";

export type SiteHeaderHamburgerProps = Partial<ComponentProps<typeof Hamburger>> & {};

export const SiteHeaderHamburger: FC<SiteHeaderHamburgerProps> = ({ className, ...restProps }) => {
  const { open, setOpen } = useSiteHeader();
  return <Hamburger open={open} onOpenChange={setOpen} className={cn("", className)} {...restProps} />;
};
