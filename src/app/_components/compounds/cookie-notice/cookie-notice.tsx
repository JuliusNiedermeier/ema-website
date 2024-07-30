"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../../primitives/container";
import { Button } from "../../primitives/button";
import { Label } from "../../primitives/typography";
import { InteractionBubble } from "../interaction-bubble";
import { useCookieConsentState } from "./state";

export type CookieNoticeRootProps = ComponentProps<"div"> & {};

export const CookieNoticeRoot: FC<CookieNoticeRootProps> = ({ className, children, ...restProps }) => {
  const { consent } = useCookieConsentState();

  if (consent !== "awaiting") return;

  return (
    <div className={cn("pointer-events-none fixed bottom-0 left-0 w-full", className)} {...restProps}>
      <Container className="flex justify-end pb-2 lg:pb-8 [&>*]:pointer-events-auto">{children}</Container>
    </div>
  );
};

export type CookieNoticeControllsProps = ComponentProps<"div"> & {
  acceptLabel: string;
  rejectLabel: string;
};

export const CookieNoticeControlls: FC<CookieNoticeControllsProps> = ({
  className,
  acceptLabel,
  rejectLabel,
  ...restProps
}) => {
  const { setConsent } = useCookieConsentState();

  return (
    <div className={cn("mt-4 flex gap-2", className)} {...restProps}>
      <Button
        size="sm"
        vairant="outline"
        className="text-neutral-900-text-muted transition-colors hover:text-neutral-900-text"
        onClick={() => setConsent("rejected")}
      >
        <Label>{rejectLabel}</Label>
      </Button>
      <Button
        size="sm"
        vairant="outline"
        className="flex-1 bg-primary-100 pr-1 text-primary-100-text"
        onClick={() => setConsent("accepted")}
      >
        <Label className="block flex-1">{acceptLabel}</Label>
        <InteractionBubble animated={false} />
      </Button>
    </div>
  );
};
