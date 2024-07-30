"use client";

import { FC } from "react";
import { env } from "~/env";
import CloudflareTurnstile, { TurnstileProps as CloudflareTurnstileProps } from "react-turnstile";

type TurnstileProps = Omit<CloudflareTurnstileProps, "sitekey">;

export const Turnstile: FC<TurnstileProps> = ({ ...restProps }) => {
  return (
    <CloudflareTurnstile sitekey={env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} fixedSize={true} theme="light" {...restProps} />
  );
};
