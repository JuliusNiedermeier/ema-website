"use client";

import { ComponentProps, createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../../primitives/container";
import { Button } from "../../primitives/button";
import { Label } from "../../primitives/typography";
import { InteractionBubble } from "../interaction-bubble";

type CookieNoticeContext = {
  visible: boolean;
  setVisibility: Dispatch<SetStateAction<boolean>>;
};

const CookieNoticeContext = createContext<CookieNoticeContext>({ visible: false, setVisibility: () => {} });

export const useCookieNotice = () => {
  const context = useContext(CookieNoticeContext);
  if (!context) throw new Error("Hook useCookieNotice must be used inside a <CookieNoticeRoot>.");
  return context;
};

export type CookieNoticeRootProps = ComponentProps<"div"> & {};

export const CookieNoticeRoot: FC<CookieNoticeRootProps> = ({ className, children, ...restProps }) => {
  const [visible, setVisibility] = useState(true);

  if (!visible) return;

  return (
    <CookieNoticeContext.Provider value={{ visible, setVisibility }}>
      <div className={cn("pointer-events-none fixed bottom-0 left-0 w-full", className)} {...restProps}>
        <Container className="flex justify-end pb-2 lg:pb-8 [&>*]:pointer-events-auto">{children}</Container>
      </div>
    </CookieNoticeContext.Provider>
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
  const { setVisibility } = useCookieNotice();

  return (
    <div className={cn("mt-4 flex gap-2", className)} {...restProps}>
      <Button
        size="sm"
        vairant="outline"
        className="text-neutral-900-text-muted transition-colors hover:text-neutral-900-text"
        onClick={() => setVisibility(false)}
      >
        <Label>{rejectLabel}</Label>
      </Button>
      <Button
        size="sm"
        vairant="outline"
        className="flex-1 bg-primary-100 pr-1 text-primary-100-text"
        onClick={() => setVisibility(false)}
      >
        <Label className="block flex-1">{acceptLabel}</Label>
        <InteractionBubble animated={false} />
      </Button>
    </div>
  );
};
