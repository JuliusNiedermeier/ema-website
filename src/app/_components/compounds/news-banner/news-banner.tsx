"use client";

import { ComponentProps, FC, useEffect } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../../primitives/container";
import { MegaphoneIcon, XIcon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useNewsBanner } from "./state";
import Link from "next/link";

export type NewsBannerProps = Omit<ComponentProps<typeof Link>, "children" | "href"> & {
  text: string;
  link: string;
  updatedAt: Date;
};

export const NewsBanner: FC<NewsBannerProps> = ({ className, text, link, updatedAt, ...restProps }) => {
  const { dismissed, setDismissed } = useNewsBanner();

  const handleDismiss: ComponentProps<"div">["onClick"] = (e) => {
    e.preventDefault();
    setDismissed(Date.now().toString());
  };

  useEffect(() => {
    if (dismissed === null || dismissed === false || updatedAt <= new Date(Number(dismissed))) return;
    setDismissed(false);
  }, [updatedAt, dismissed]);

  return (
    <Link
      target={link.startsWith("/") ? "_self" : "_blank"}
      href={link}
      className={cn(
        "block h-0 overflow-hidden border-b-[gray]/20 bg-primary-100 transition-[height,_border-bottom-width,_filter] hover:brightness-95",
        {
          "h-10 border-b": dismissed === false,
        },
        className,
      )}
      {...restProps}
    >
      <Container className="flex h-full items-center gap-4 overflow-hidden">
        <MegaphoneIcon size="20" className="shrink-0" />
        <Label className="overflow-hidden text-ellipsis whitespace-nowrap">{text}</Label>
        <div
          className="ml-auto rounded-full border border-transparent p-1 hover:border-neutral-900/20"
          onClick={handleDismiss}
        >
          <XIcon size="18" />
        </div>
      </Container>
    </Link>
  );
};
