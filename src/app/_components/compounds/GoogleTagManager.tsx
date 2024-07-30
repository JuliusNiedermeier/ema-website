"use client";

import { GoogleTagManager as GTM } from "@next/third-parties/google";
import { FC, useEffect } from "react";
import { useCookieConsentState } from "./cookie-notice/state";

export type GoogleTagManagerProps = { gtmID: string };

export const GoogleTagManager: FC<GoogleTagManagerProps> = ({ gtmID }) => {
  const { consent } = useCookieConsentState();

  useEffect(() => {
    if (consent === "awaiting") {
      window.dataLayer?.push("consent", "default", { analytics_storage: "denied" });
    } else {
      window.dataLayer?.push("consent", "update", { analytics_storage: consent === "accepted" ? "granted" : "denied" });
    }
  }, [consent]);

  return <GTM gtmId={gtmID} />;
};
