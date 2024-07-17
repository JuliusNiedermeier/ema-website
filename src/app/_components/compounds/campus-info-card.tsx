"use client";

import { ComponentProps, FC, useRef, useState } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { ArrowUpRightIcon } from "lucide-react";

export type CampusInfoCardProps = ComponentProps<"div"> & {};

const maxWidth = 500;

export const CampusInfoCard: FC<CampusInfoCardProps> = ({ className, onClick, ...restProps }) => {
  const [state, setState] = useState<"will-open" | "open" | "will-close" | "closed">("closed");

  const containerRef = useRef<HTMLDivElement>(null);
  const contentWindowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCardClick: ComponentProps<"div">["onClick"] = (e) => {
    state === "open" || state === "will-open" ? closeCard() : openCard();
    onClick?.(e);
  };

  const openCard = () => {
    if (!containerRef.current || !contentRef.current) return;

    const parentWidth = containerRef.current.parentElement?.clientWidth;
    if (!parentWidth) return;

    // Set absolute positioned content div to calculated target width
    const currentWidth = containerRef.current?.clientWidth;
    const targetWidth = parentWidth > maxWidth ? maxWidth : parentWidth;
    contentRef.current.style.width = `${targetWidth}px`;

    requestAnimationFrame(async () => {
      if (!containerRef.current || !contentRef.current) return;

      setState("will-open");

      // Measure the resulting content height after layout recalculation
      const targetHeight = contentRef.current.clientHeight;

      // Animate the container to the calculated width
      const widthAnimation = containerRef.current!.animate(
        [{ width: `${currentWidth}px` }, { width: `${targetWidth}px` }],
        {
          duration: 150,
          easing: "ease",
          iterations: 1,
        },
      );

      // Animate the contentWindow to the measured height
      const heightAnimation = contentWindowRef.current!.animate(
        [{ height: `${0}px` }, { height: `${targetHeight}px` }],
        {
          duration: 150,
          easing: "ease",
          iterations: 1,
        },
      );

      const widthAnimationPromise = new Promise((resolve) => {
        widthAnimation.addEventListener("finish", resolve);
      });

      const heightAnimationPromise = new Promise((resolve) => {
        heightAnimation.addEventListener("finish", resolve);
      });

      // Await both animations
      await Promise.all([widthAnimationPromise, heightAnimationPromise]);

      // Position the content ref statically, to prevent the content window from collapsing, after the animation was played
      contentRef.current.style.position = "static";

      // Finally set the open state to true, for other elements to react
      setState("open");
    });
  };

  const closeCard = () => {
    if (!contentWindowRef.current || !contentRef.current) return;
    contentRef.current.style.position = "absolute";
    setState("closed");
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group max-w-[500px] cursor-pointer rounded-[1.3rem] bg-neutral-100 transition-all duration-150 hover:rounded-2xl md:rounded-[4rem]",
        { "w-fit": state === "closed", "!rounded-[1.3rem] pt-4": state === "will-open" || state === "open" },
        className,
      )}
      onClick={handleCardClick}
      {...restProps}
    >
      <div className="flex items-center justify-between gap-4 p-4 pl-8">
        <div>
          <Heading size="sm" className="m-0 mt-1">
            Title
          </Heading>
          <Label className="text-neutral-100-text-muted">Subtitle</Label>
        </div>
        <div
          className={cn(
            "relative h-8 w-8 overflow-hidden rounded-full bg-primary-900 text-primary-900-text transition-transform",
            {
              "rotate-180": state === "open",
            },
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
      <div ref={contentWindowRef} className={cn("relative overflow-hidden transition-[height]")}>
        <div ref={contentRef} className="left-0 top-0 w-full px-8 pb-4" style={{ position: "absolute" }}>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam unde perspiciatis ipsam eos dolor itaque
            iste. Possimus porro, minima aspernatur inventore illum corporis, quisquam suscipit nulla accusantium rerum
            labore libero.
          </Paragraph>
        </div>
      </div>
    </div>
  );
};
