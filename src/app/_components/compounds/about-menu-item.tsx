"use client";

import Link from "next/link";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Paragraph } from "../primitives/typography";
import { InteractionBubble } from "./interaction-bubble";
import Image from "next/image";
import { usePathname } from "next/navigation";

export type AboutMenuItemProps = ComponentProps<typeof Link> & {
  heading: string;
  description: string;
  image: { url: string; alt: string };
};

export const AboutMenuItem: FC<AboutMenuItemProps> = ({
  className,
  href,
  heading,
  description,
  image,
  ...restProps
}) => {
  const pathname = usePathname();

  const active = pathname === href.toString();

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col rounded-3xl border p-2 transition-colors hover:bg-neutral-100",
        { "pointer-events-none bg-primary-900 text-neutral-900-text": active },
        className,
      )}
      {...restProps}
    >
      <div className="flex-1 p-6">
        <Heading tag="h3" size="sm">
          {heading}
        </Heading>
        <Paragraph className={cn("line-clamp-2", { "text-neutral-900-text-muted": active })}>{description}</Paragraph>
      </div>
      <div className="relative mt-2 aspect-video overflow-hidden rounded-2xl">
        <Image
          src={image.url}
          alt={image.alt}
          width="500"
          height="500"
          className="h-full w-full object-cover brightness-90"
        />
        <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </Link>
  );
};
