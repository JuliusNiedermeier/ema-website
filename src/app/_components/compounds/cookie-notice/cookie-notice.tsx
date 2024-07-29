import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../../primitives/card";
import { Label } from "../../primitives/typography";
import { Button } from "../../primitives/button";
import { InteractionBubble } from "../interaction-bubble";

export type CookieNoticeProps = Omit<ComponentProps<typeof Card>, "children"> & {};

export const CookieNotice: FC<CookieNoticeProps> = ({ className, ...restProps }) => {
  return (
    <Card className={cn("w-fit max-w-96 border border-neutral-400/20 bg-primary-900", className)} {...restProps}>
      <Label className="text-neutral-900-text">Wir nutzen Cookies</Label>
      <Label className="mt-2 block text-neutral-900-text-muted">
        Wenn Sie auf „Akzeptieren“ klicken, erklären Sie sich mit der Speicherung von Cookies auf Ihrem Gerät
        einverstanden.
      </Label>
      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          vairant="outline"
          className="text-neutral-900-text-muted transition-colors hover:text-neutral-900-text"
        >
          <Label>Ablehnen</Label>
        </Button>
        <Button size="sm" vairant="outline" className="flex-1 bg-primary-100 pr-1 text-primary-100-text">
          <Label className="block flex-1">Akzeptieren</Label>
          <InteractionBubble animated={false} />
        </Button>
      </div>
    </Card>
  );
};
