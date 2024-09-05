"use client";

import {
  ComponentProps,
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label } from "../primitives/typography";
import { ArrowUpRightIcon } from "lucide-react";

let lastID = 0;

const createID = () => (lastID++).toString();

type AnimationState = "expanding" | "expanded" | "closing" | "closed";

export type ExpandableInfoCardProps = ComponentProps<"div"> & {
  title: string;
  subtitle: string;
};

const maxWidth = 500;
const animationDuration = 150;

export const ExpandableInfoCard: FC<ExpandableInfoCardProps> = ({
  className,
  onClick,
  title,
  subtitle,
  children,
  ...restProps
}) => {
  const { expandedID, setExpandedID } = useExpandableInfoCardList();
  const IDRef = useRef(createID());
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWindowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const active = expandedID === IDRef.current;

  const [animationState, setAnimationState] = useState<AnimationState>(active ? "expanded" : "closed");

  const handleCardClick: ComponentProps<"div">["onClick"] = (e) => {
    setExpandedID(active ? null : IDRef.current);
    onClick?.(e);
  };

  const expand = () => {
    if (!containerRef.current || !contentRef.current) return;

    const parentWidth = containerRef.current.parentElement?.clientWidth;
    if (!parentWidth)
      return console.warn("ExpandableInfoCard must have a parent element to calculate its expanded width.");

    const currentWidth = contentWindowRef.current?.clientWidth;
    const targetWidth = parentWidth > maxWidth ? maxWidth : parentWidth;

    contentRef.current.style.width = `${targetWidth}px`;

    requestAnimationFrame(async () => {
      if (!contentRef.current) return;

      const currentHeight = 0;
      const targetHeight = contentRef.current.clientHeight;

      const animationKeyframes: Keyframe[] = [
        { width: `${currentWidth}px`, height: `${currentHeight}px` },
        { width: `${targetWidth}px`, height: `${targetHeight}px` },
      ];

      const animation = contentWindowRef.current!.animate(animationKeyframes, {
        duration: animationDuration,
        easing: "ease-out",
      });

      setAnimationState("expanding");

      animation.addEventListener("finish", () => {
        if (!contentRef.current) return;
        contentRef.current.style.position = "static";
        setAnimationState("expanded");
      });
    });
  };

  const close = () => {
    if (!contentRef.current) return;
    contentRef.current.style.position = "absolute";
    setAnimationState("closed");
  };

  useEffect(() => {
    if ((!active && animationState === "closed") || (active && animationState === "expanded")) return;
    active ? expand() : close();
  }, [active, animationState, expand, close]);

  return (
    <div
      ref={containerRef}
      className={cn("group w-fit cursor-pointer rounded-[1.3rem] bg-neutral-100 transition-all", className)}
      style={{ maxWidth: `${maxWidth}px`, transitionDuration: `${animationDuration}ms` }}
      onClick={handleCardClick}
      {...restProps}
    >
      <div className="flex items-start justify-between gap-4 p-4 pl-6">
        <div className={cn("transition-[padding-top]", { "pt-4": active })}>
          <Heading size="sm" className="m-0 mt-1">
            {title}
          </Heading>
          <Label className="text-neutral-100-text-muted">{subtitle}</Label>
        </div>
        <div
          className={cn(
            "relative h-8 w-8 overflow-hidden rounded-full bg-primary-900 text-primary-900-text transition-transform",
            { "rotate-180": active },
          )}
        >
          <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
            <ArrowUpRightIcon className="transition-all duration-300 group-hover:-translate-y-full group-hover:translate-x-full" />
          </div>
          <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
            <ArrowUpRightIcon className="-translate-x-full translate-y-full transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
          </div>
        </div>
      </div>
      <div ref={contentWindowRef} className={cn("relative overflow-hidden")}>
        <div ref={contentRef} className="left-0 top-0 px-6 pb-4" style={{ position: "absolute" }}>
          {children}
        </div>
      </div>
    </div>
  );
};

type ExpandableInfoCardListContext = {
  expandedID: string | null;
  setExpandedID: Dispatch<SetStateAction<string | null>>;
};
const ExpandableInfoCardListContext = createContext<ExpandableInfoCardListContext>({
  expandedID: null,
  setExpandedID: () => {},
});

export const useExpandableInfoCardList = () => {
  const context = useContext(ExpandableInfoCardListContext);
  if (!context)
    throw new Error("Hook useExpandableInfoCardList must be used within a <ExpandableInfoCardListProvider>.");
  return context;
};

export const ExpandableInfoCardListProvider: FC<PropsWithChildren> = ({ children }) => {
  const [expandedID, setExpandedID] = useState<ExpandableInfoCardListContext["expandedID"]>(null);
  return (
    <ExpandableInfoCardListContext.Provider value={{ expandedID, setExpandedID }}>
      {children}
    </ExpandableInfoCardListContext.Provider>
  );
};
