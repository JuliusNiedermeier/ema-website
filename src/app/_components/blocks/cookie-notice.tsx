import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Label } from "../primitives/typography";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { CookieNoticeQueryResult } from "../../../../generated/sanity/types";
import { CookieNoticeControlls } from "../compounds/cookie-notice/cookie-notice";

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
      <CookieNoticeControlls
        acceptLabel={cookieNotice?.acceptLabel || ""}
        rejectLabel={cookieNotice?.rejectLabel || ""}
      />
    </Card>
  );
};
