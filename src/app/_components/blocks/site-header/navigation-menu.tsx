"use client";

import { ComponentProps, FC, ReactNode, createContext, useContext, useState } from "react";
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
  activeMenu: string | null;
  // setOpen: Dispatch<SetStateAction<boolean>>;
};

const NavigationMenuContext = createContext<NavigationMenuContext>({ activeMenu: null });

export const useNavigationMenu = () => {
  const context = useContext(NavigationMenuContext);
  if (!context) throw "The useNavigationMenu hook must be used inside a NavigationMenu.";
  return context;
};

export type NavigationMenuProps = ComponentProps<typeof Menu> & {};

export const NavigationMenu: FC<NavigationMenuProps> = ({ children, ...restProps }) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <Menu onValueChange={setValue} {...restProps}>
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

  const active = exact ? pathName === href : pathName.startsWith(href instanceof URL ? href.href : (href as string));

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
          <MenuContent className="data-[motion='from-start']:animate-enterFromLeft data-[motion='from-end']:animate-enterFromRight data-[motion='to-start']:animate-exitToLeft data-[motion='to-end']:animate-exitToRight absolute left-0 top-0 w-full">
            {menuContent}
          </MenuContent>
        </>
      ) : (
        <MenuLink asChild>
          <Link
            href={href || "/"}
            className={cn("group flex h-full items-center px-2", { "pointer-events-none": active })}
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
  return <Backdrop visible={Boolean(activeMenu)} onClick={() => {}} />;
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