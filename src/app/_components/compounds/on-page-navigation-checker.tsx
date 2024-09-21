"use client";

import { usePathname } from "next/navigation";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";

const OnPageNavigationCheckerContext = createContext<boolean>(false);

export const useOnPageNavigationChecker = () => {
  const context = useContext(OnPageNavigationCheckerContext);
  if (context === undefined)
    throw new Error("Hook useOnPageNavigationChecker must be used inside <OnPageNavigationChecker>.");
  return context;
};

export const OnPageNavigationChecker: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const [hasNavigated, setHasNavigated] = useState<boolean>(false);
  const [initialPathname, setInitialPathname] = useState<string | null>(null);

  useEffect(() => {
    if (!initialPathname) setInitialPathname(pathname);
    else if (pathname !== initialPathname) setHasNavigated(true);
  }, [pathname, initialPathname]);

  return (
    <OnPageNavigationCheckerContext.Provider value={hasNavigated}>{children}</OnPageNavigationCheckerContext.Provider>
  );
};
