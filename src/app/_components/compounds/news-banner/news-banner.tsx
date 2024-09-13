"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../../primitives/container";
import { MegaphoneIcon, XIcon } from "lucide-react";
import { Label } from "../../primitives/typography";
import { useNewsBanner } from "./state";

export type NewsBannerProps = ComponentProps<"div"> & {};

export const NewsBanner: FC<NewsBannerProps> = ({ className, ...restProps }) => {
  const { dismissed, setDismissed } = useNewsBanner();

  return (
    <div
      className={cn(
        "h-0 overflow-hidden border-b-[gray]/20 bg-primary-100 transition-[height,_border-bottom-width]",
        {
          "h-10 border-b": dismissed === false,
        },
        className,
      )}
      {...restProps}
    >
      <Container className="flex h-full items-center gap-4 overflow-hidden">
        <MegaphoneIcon size="20" className="shrink-0" />
        <Label className="overflow-hidden text-ellipsis whitespace-nowrap">
          NEWS ohne Voranmeldung: zusätzliche offene Beratungen bis einschließlich 23.09.2024 jeweils montags von 16:00
          bis 17:00 Uhr!
        </Label>
        <div
          className="ml-auto rounded-full border border-transparent p-1 hover:border-neutral-900/20"
          onClick={() => setDismissed(true)}
        >
          <XIcon size="18" />
        </div>
      </Container>
    </div>
  );
};
