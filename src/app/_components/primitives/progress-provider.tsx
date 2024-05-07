"use client";

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

type ProgressContext = { progress: number; setProgress: Dispatch<SetStateAction<number>> };

const ProgressContext = createContext<ProgressContext>({ progress: 0, setProgress: () => {} });

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("Hook useProgress must be used inside a <ProgressProvider>.");
  return context;
};

export const ProgressProvider: FC<PropsWithChildren> = ({ children }) => {
  const [progress, setProgress] = useState(0);
  return <ProgressContext.Provider value={{ progress, setProgress }}>{children}</ProgressContext.Provider>;
};
