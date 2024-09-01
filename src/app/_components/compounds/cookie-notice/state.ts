import { create } from "zustand";
import { persist } from "zustand/middleware";

type CookieConsentStatus = null | "awaiting" | "rejected" | "accepted";

export type CookieConsentState = {
  consent: CookieConsentStatus;
  setConsent: (consent: Exclude<CookieConsentStatus, null>) => void;
};

export const useCookieConsentState = create(
  persist<CookieConsentState>(
    (set, get) => ({
      consent: null,
      setConsent: (consent) => set((state) => ({ ...state, consent })),
    }),
    {
      name: "cookie-consent",
      onRehydrateStorage: () => {
        // Appearently setters must be called in this returned callback and on the state passed to it.
        // Not the state passed to onRehydrateStorage
        return (state) => state?.consent === null && state.setConsent("awaiting");
      },
    },
  ),
);
