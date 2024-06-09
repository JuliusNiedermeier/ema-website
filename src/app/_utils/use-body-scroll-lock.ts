import { useCallback } from "react";

export const useBodyScrollLock = () => {
  return useCallback((lock: boolean) => {
    document.body.style.overflowY = lock ? "hidden" : "";
  }, []);
};
