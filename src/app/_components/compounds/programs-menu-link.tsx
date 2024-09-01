"use client";

import Link from "next/link";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { InteractionBubble } from "./interaction-bubble";
import { usePathname } from "next/navigation";
import { createColorThemeStyles, ensureValidHSL, HSLValue } from "~/app/_utils/color-swatch";

export type ProgramTypeMenuLinkProps = ComponentProps<typeof Link> & {
  heading: string;
  description: string;
};

export const ProgramTypeMenuLink: FC<ProgramTypeMenuLinkProps> = ({
  className,
  href,
  heading,
  description,
  ...restProps
}) => {
  const pathname = usePathname();

  const active = pathname === href.toString();

  return (
    <Link
      href={href}
      className={cn(
        "group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-neutral-400",
        { "pointer-events-none bg-primary-900 text-neutral-900-text": active },
        className,
      )}
      {...restProps}
    >
      <InteractionBubble
        animated={false}
        className={cn("bg-neutral-400 text-primary-900", { "bg-primary-100 text-primary-100-text": active })}
      />
      <div className="flex-1 overflow-hidden">
        <Heading size="sm" className="mb-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {heading}
        </Heading>
        <Paragraph
          className={cn("mt-1 overflow-hidden text-ellipsis whitespace-nowrap", {
            "text-neutral-900-text-muted": active,
          })}
        >
          {description}
        </Paragraph>
      </div>
    </Link>
  );
};

export type ProgramMenuLinkProps = Omit<ComponentProps<typeof Link>, "color"> & {
  heading: string;
  color: HSLValue;
};

export const ProgramMenuLink: FC<ProgramMenuLinkProps> = ({ className, href, heading, color, ...restProps }) => {
  const pathname = usePathname();

  const active = pathname === href.toString();

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-1 items-center gap-3 rounded-2xl bg-themed-primary p-2 transition-all hover:bg-themed-secondary",
        { "pointer-events-none bg-primary-900 text-neutral-900-text": active },
        className,
      )}
      style={createColorThemeStyles(color)}
      {...restProps}
    >
      <InteractionBubble
        animated={false}
        className={cn("rounded-xl", { "bg-primary-100 text-primary-100-text": active })}
      />
      <Label className="m-0 whitespace-nowrap">{heading}</Label>
    </Link>
  );
};
