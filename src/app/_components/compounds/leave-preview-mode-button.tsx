"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Button } from "../primitives/button";
import { PenOffIcon } from "lucide-react";
import { Label } from "../primitives/typography";
import { usePathname } from "next/navigation";

export type LeavePreviewModeButtonProps = ComponentProps<typeof Button> & {};

export const LeavePreviewModeButton: FC<LeavePreviewModeButtonProps> = ({ className, ...restProps }) => {
  const pathname = usePathname();

  return (
    <Button asChild size="sm" className={cn("gap-4 border border-neutral-400/20", className)} {...restProps}>
      <a href={`/api/draft-mode/disable?redirect=${pathname}`}>
        <PenOffIcon size={20} />
        <Label>Leave preview mode</Label>
      </a>
    </Button>
  );
};
