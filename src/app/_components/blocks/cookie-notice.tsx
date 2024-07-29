import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Label } from "../primitives/typography";
import { Button } from "../primitives/button";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { CookieNoticeQueryResult } from "../../../../generated/sanity/types";

const cookieNoticeQuery = groq`*[_type == "cookie-notice-config"][0]`;

export type CookieNoticeProps = Omit<ComponentProps<typeof Card>, "children"> & {};

export const CookieNotice: FC<CookieNoticeProps> = async ({ className, ...restProps }) => {
  const cookieNotice = await sanity.fetch<CookieNoticeQueryResult>(
    cookieNoticeQuery,
    {},
    { next: { tags: ["cookie-notice-config"] } },
  );

  return (
    <Card className={cn("w-fit max-w-96 border border-neutral-400/20 bg-primary-900", className)} {...restProps}>
      <Label className="text-neutral-900-text">{cookieNotice?.heading}</Label>
      <Label className="mt-2 block text-neutral-900-text-muted">{cookieNotice?.description}</Label>
      <div className="mt-4 flex gap-2">
        <Button
          size="sm"
          vairant="outline"
          className="text-neutral-900-text-muted transition-colors hover:text-neutral-900-text"
        >
          <Label>{cookieNotice?.rejectLabel}</Label>
        </Button>
        <Button size="sm" vairant="outline" className="flex-1 bg-primary-100 pr-1 text-primary-100-text">
          <Label className="block flex-1">{cookieNotice?.acceptLabel}</Label>
          <InteractionBubble animated={false} />
        </Button>
      </div>
    </Card>
  );
};
