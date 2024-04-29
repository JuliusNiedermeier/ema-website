"use client";

import { Dispatch, FC, PropsWithChildren, SetStateAction, createContext, useContext, useState } from "react";

type SiteHeaderContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const defaultContextValue: SiteHeaderContext = { open: false, setOpen: () => {} };

const SiteHeaderContext = createContext<SiteHeaderContext>(defaultContextValue);

export const useSiteHeader = () => {
  const context = useContext(SiteHeaderContext);
  if (!context) throw "The useSiteHeader hook must be used inside a SiteHeaderProvider.";
  return context;
};

export const SiteHeaderContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false);
  return <SiteHeaderContext.Provider value={{ open, setOpen }}>{children}</SiteHeaderContext.Provider>;
};
