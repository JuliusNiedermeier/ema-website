"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "../primitives/typography";
import { Chip } from "../primitives/chip";
import { useCookieConsentState } from "./cookie-notice/state";

export type ResetCookieConsentProps = ComponentProps<"button"> & {
  label: string;
};

export const ResetCookieConsent: FC<ResetCookieConsentProps> = ({ className, label, ...restProps }) => {
  const { setConsent } = useCookieConsentState();

  return (
    <button className={cn("group", className)} onClick={() => setConsent("awaiting")} {...restProps}>
      <Chip className={cn("bg-neutral-100/5 transition-colors group-hover:bg-neutral-100/10")}>
        <Label className="text-neutral-900-text-muted transition-colors group-hover:text-neutral-900-text">
          {label}
        </Label>
      </Chip>
    </button>
  );
};
