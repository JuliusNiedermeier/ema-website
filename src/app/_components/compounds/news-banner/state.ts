import { create } from "zustand";
import { persist } from "zustand/middleware";

type NewsBannerStatus = null | boolean;

export type NewsBannerState = {
  dismissed: NewsBannerStatus;
  setDismissed: (dismissed: Exclude<NewsBannerStatus, null>) => void;
};

export const useNewsBanner = create(
  persist<NewsBannerState>(
    (set, get) => ({
      dismissed: null,
      setDismissed: (dismissed) => set((state) => ({ ...state, dismissed })),
    }),
    {
      name: "news-banner",
      onRehydrateStorage: () => {
        // Appearently setters must be called in this returned callback and on the state passed to it.
        // Not the state passed to onRehydrateStorage
        return (state) => state?.dismissed === null && state.setDismissed(false);
      },
    },
  ),
);
