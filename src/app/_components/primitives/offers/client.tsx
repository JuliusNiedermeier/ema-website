"use client";

import {
  ComponentProps,
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../card";
import { Tab } from "../tabs";

type OfferGroupCardContext = {
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  windowRef: RefObject<HTMLDivElement>;
};

const defaultContextValue = { index: 0, setIndex: () => {}, windowRef: { current: null } };

const OfferGroupCardContext = createContext<OfferGroupCardContext>(defaultContextValue);

export type OfferGroupCardProps = ComponentProps<typeof Card> & {};

export const OfferGroupCard: FC<OfferGroupCardProps> = ({ className, ...restProps }) => {
  const [index, setIndex] = useState(0);
  const windowRef = useRef<HTMLDivElement>(null);

  const contextValue = useMemo(
    () => ({
      index,
      setIndex,
      windowRef,
    }),
    [index, windowRef],
  );

  return (
    <OfferGroupCardContext.Provider value={contextValue}>
      <Card className={cn("flex flex-1 flex-col overflow-hidden rounded-3xl p-2", className)} {...restProps} />
    </OfferGroupCardContext.Provider>
  );
};

export type OfferGroupProps = ComponentProps<"div"> & {
  index: number;
};

export const OfferGroup: FC<OfferGroupProps> = ({ className, index, ...restProps }) => {
  const context = useContext(OfferGroupCardContext);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (context.index === index) {
      const offsetLeft = cardRef.current?.offsetLeft;
      context.windowRef.current?.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [context.index]);

  useEffect(() => {
    if (!context.windowRef.current || !cardRef.current) return;

    const observer = new IntersectionObserver(
      (intersections) => {
        intersections.forEach((intersection) => {
          if (!intersection.isIntersecting) return;
          context.setIndex(index);
        });
      },
      { root: context.windowRef.current, threshold: 0.5 },
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [context.windowRef.current, cardRef.current]);

  return (
    <div
      ref={cardRef}
      className={cn("flex h-full snap-start flex-col gap-2 overflow-hidden", className)}
      {...restProps}
    />
  );
};

export type OfferGroupWindowProps = ComponentProps<"div"> & {};

export const OfferGroupWindow: FC<OfferGroupWindowProps> = ({ className, ...restProps }) => {
  const context = useContext(OfferGroupCardContext);
  return (
    <div
      ref={context.windowRef}
      className={cn(
        "scrollbar-none relative flex flex-1 snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl",
        className,
      )}
      {...restProps}
    />
  );
};

export type OffersGroupTabProps = ComponentProps<typeof Tab> & {
  index: number;
};

export const OffersGroupTab: FC<OffersGroupTabProps> = ({ className, index, ...restProps }) => {
  const context = useContext(OfferGroupCardContext);

  return (
    <Tab
      className={cn("", className)}
      onClick={() => context.setIndex(index)}
      active={context.index === index}
      {...restProps}
    />
  );
};
