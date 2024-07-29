"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../../primitives/container";

export type CookieNoticeRootProps = ComponentProps<"div"> & {};

export const CookieNoticeRoot: FC<CookieNoticeRootProps> = ({ className, children, ...restProps }) => {
  return (
    <div className={cn("fixed bottom-0 left-0 w-full", className)} {...restProps}>
      <Container className="flex justify-end pb-2 lg:pb-8">{children}</Container>
    </div>
  );
};
