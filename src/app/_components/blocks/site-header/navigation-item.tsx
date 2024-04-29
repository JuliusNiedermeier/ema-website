"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../../primitives/typography";
import { useSiteHeader } from "./site-header-context";

type NavigationItemProps = {
  href: string;
  label: string;
  exact?: boolean;
  menu?: boolean;
  onClick?: () => any;
};

export const NavigationItem: FC<NavigationItemProps> = ({ href, label, exact, onClick, menu }) => {
  const pathName = usePathname();
  const { setOpen } = useSiteHeader();

  const active = exact ? pathName === href : pathName.startsWith(href);

  const handleClick = () => {
    if (!menu) return;
    setOpen((open) => !open);
  };

  const Component = menu ? "button" : Link;

  return (
    <Component href={href} onClick={handleClick} className={cn("group relative flex cursor-pointer items-center")}>
      <div
        className={cn(
          "h-1 w-1 rounded-full bg-neutral-900",
          "transition-all",
          "absolute -left-3 top-1/2 -translate-y-1/2 opacity-100",
          {
            "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-20 group-active:w-2": !active,
          },
        )}
      />
      <Label>{label}</Label>
    </Component>
  );
};
