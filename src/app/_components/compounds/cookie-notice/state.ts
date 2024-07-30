import { create } from "zustand";
import { persist } from "zustand/middleware";

type CookieConsentStatus = "awaiting" | "rejected" | "accepted";

export type CookieConsentState = {
  consent: CookieConsentStatus;
  setConsent: (consent: CookieConsentStatus) => void;
};

export const useCookieConsentState = create(
  persist<CookieConsentState>(
    (set, get) => ({
      consent: "awaiting",
      setConsent: (consent) => set((state) => ({ ...state, consent })),
    }),
    {
      name: "cookie-consent",
    },
  ),
);
