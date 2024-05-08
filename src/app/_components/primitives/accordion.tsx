"use client";

import { ComponentProps, FC, createContext, useCallback, useContext, useEffect, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { PlusMinus } from "../compounds/plus-minus";

type AccordionContext = { expandedIndex: number | null; toggle: (index: number) => void };

const AccordionContext = createContext<AccordionContext>({ expandedIndex: null, toggle: () => {} });

export const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("Hook useAccordion must be used inside an <Accordion>.");
  return context;
};

export type AccordionProps = ComponentProps<"div"> & {};

export const Accordion: FC<AccordionProps> = ({ ...restProps }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (index: number) => setExpandedIndex(expandedIndex === index ? null : index),
    [expandedIndex, setExpandedIndex],
  );

  return (
    <AccordionContext.Provider value={{ expandedIndex, toggle }}>
      <div {...restProps} />
    </AccordionContext.Provider>
  );
};

type AccordionItemContext = { expanded: boolean; toggle: () => void };

const AccordionItemContext = createContext<AccordionItemContext>({ expanded: false, toggle: () => {} });

export const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);
  if (!context) throw new Error("Hook useAccordionItem must be used inside an <AccordionItem>.");
  return context;
};

export type AccordionItemProps = ComponentProps<"div"> & {
  index: number;
};

export const AccordionItem: FC<AccordionItemProps> = ({ className, index, ...restProps }) => {
  const { expandedIndex, toggle } = useAccordion();
  return (
    <AccordionItemContext.Provider value={{ expanded: expandedIndex === index, toggle: () => toggle(index) }}>
      <div className={cn("border-b border-[gray]/50 first:border-t", className)} {...restProps} />
    </AccordionItemContext.Provider>
  );
};

export type AccordionItemTriggerProps = ComponentProps<"button"> & {};

export const AccordionItemTrigger: FC<AccordionItemTriggerProps> = ({ className, ...restProps }) => {
  const { toggle, expanded } = useAccordionItem();
  return (
    <button
      onClick={toggle}
      className={cn(
        "flex w-full items-start justify-between px-4 py-4 text-left transition-all",
        { "pt-8": expanded },
        className,
      )}
      {...restProps}
    />
  );
};

export type AccordionItemTriggerIndicatorProps = Omit<ComponentProps<typeof PlusMinus>, "open"> & {};

export const AccordionItemTriggerIndicator: FC<AccordionItemTriggerIndicatorProps> = ({ ...restProps }) => {
  const { expanded } = useAccordionItem();
  return <PlusMinus open={expanded} {...restProps} />;
};

export type AccordionItemContentProps = ComponentProps<"div"> & {};

export const AccordionItemContent: FC<AccordionItemContentProps> = ({ className, ...restProps }) => {
  const { expanded } = useAccordionItem();
  return (
    <div
      className={cn(
        "m-0 grid grid-rows-[0fr] overflow-hidden px-4 transition-all [&>*]:overflow-hidden",
        { "mb-8 grid-rows-[1fr]": expanded },
        className,
      )}
      {...restProps}
    />
  );
};
