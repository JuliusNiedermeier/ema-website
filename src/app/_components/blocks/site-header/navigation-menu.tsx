"use client";

import { ComponentProps, FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { cn } from "~/app/_utils/cn";
import {
  NavigationMenu as Menu,
  NavigationMenuLink as MenuLink,
  NavigationMenuItem as MenuItem,
  NavigationMenuTrigger as MenuTrigger,
  NavigationMenuContent as MenuContent,
} from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Backdrop } from "../../primitives/backdrop";
import { Hamburger } from "../../compounds/hamburger";
import { usePathname } from "next/navigation";

export { NavigationMenuIndicator, NavigationMenuList, NavigationMenuViewport } from "@radix-ui/react-navigation-menu";

// Navigation Menu

type NavigationMenuContext = {
  activeMenu: string;
};

const NavigationMenuContext = createContext<NavigationMenuContext>({ activeMenu: "" });

export const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) throw "The useNavigationMenu hook must be used inside a NavigationMenu.";
  return context;
};

export type NavigationMenuProps = ComponentProps<typeof Menu> & {};

export const NavigationMenu: FC<NavigationMenuProps> = ({ children, ...restProps }) => {
  const [value, setValue] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => setValue(""), [pathname, setValue]);

  return (
    <Menu value={value} onValueChange={setValue} {...restProps}>
      <NavigationMenuContext.Provider value={{ activeMenu: value }}>{children}</NavigationMenuContext.Provider>
    </Menu>
  );
};

// Navigation Menu Item

export type NavigationMenuItemProps = Omit<ComponentProps<typeof MenuItem>, "children"> & {
  label: string;
  href: ComponentProps<typeof Link>["href"];
  menuContent?: ReactNode;
  exact?: boolean;
};

export const NavigationMenuItem: FC<NavigationMenuItemProps> = ({
  className,
  href,
  label,
  menuContent,
  exact = false,
  ...restProps
}) => {
  const pathName = usePathname();

  const isExactActive = pathName === href;
  const active = exact ? isExactActive : pathName.startsWith(href instanceof URL ? href.href : (href as string));

  return (
    <MenuItem className={cn("", className)} {...restProps}>
      {menuContent ? (
        <>
          <MenuTrigger className={cn("group h-full px-2")}>
            <div
              className={cn(
                "rounded-full border border-transparent px-3 py-1 transition group-hover:border-[gray]/50",
                {
                  "bg-primary-900 text-neutral-900-text": active,
                },
              )}
            >
              {label}
            </div>
          </MenuTrigger>
          <MenuContent className="absolute left-0 top-0 w-full data-[motion='from-end']:animate-enterFromRight data-[motion='from-start']:animate-enterFromLeft data-[motion='to-end']:animate-exitToRight data-[motion='to-start']:animate-exitToLeft">
            {menuContent}
          </MenuContent>
        </>
      ) : (
        <MenuLink asChild>
          <Link
            href={href || "/"}
            className={cn("group flex h-full items-center px-2", { "pointer-events-none": isExactActive })}
          >
            <div
              className={cn(
                "rounded-full border border-transparent px-3 py-1 transition group-hover:border-[gray]/50",
                {
                  "bg-primary-900 text-neutral-900-text": active,
                },
              )}
            >
              {label}
            </div>
          </Link>
        </MenuLink>
      )}
    </MenuItem>
  );
};

// Navigation Menu Backdrop

export const NavigationMenuBackdrop: FC = () => {
  const { activeMenu } = useNavigationMenu();
  return <Backdrop visible={Boolean(activeMenu)} onClick={() => {}} className="z-50 backdrop-blur-sm" />;
};

// Hamburger

export type NavigationMenuMobileMenuItemProps = ComponentProps<typeof MenuItem> & {};

export const NavigationMenuMobileMenuItem: FC<NavigationMenuMobileMenuItemProps> = ({
  className,
  children,
  ...restProps
}) => {
  const { activeMenu } = useNavigationMenu();

  return (
    <MenuItem className={cn(className)} {...restProps}>
      <MenuTrigger asChild>
        <Hamburger open={Boolean(activeMenu)} />
      </MenuTrigger>
      <MenuContent>{children}</MenuContent>
    </MenuItem>
  );
};
