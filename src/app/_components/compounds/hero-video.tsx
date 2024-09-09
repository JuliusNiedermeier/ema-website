"use client";

import { motion, Transition, useDomEvent } from "framer-motion";
import { ComponentProps, FC, useEffect, useRef, useState } from "react";
import { cn } from "~/app/_utils/cn";

const transition: Transition = {
  type: "spring",
  damping: 25,
  stiffness: 300,
};

export type HeroVideoProps = ComponentProps<"div"> & {
  src: string;
};

export const HeroVideo: FC<HeroVideoProps> = ({ className, src, ...restProps }) => {
  const [isOpen, setOpen] = useState(false);

  const windowRef = useRef<Window | null>(null);

  useEffect(() => {
    windowRef.current = window;
  }, []);

  useDomEvent(windowRef, "scroll", () => isOpen && setOpen(false));

  return (
    <div className="relative h-[80vh] w-full">
      <motion.div
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={transition}
        className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 z-50 bg-neutral-900/40 opacity-0"
        onClick={(e) => {
          // TODO: Fix closing bug on iPad
          e.preventDefault();
          setOpen(false);
        }}
      />

      <motion.div
        className={cn("absolute bottom-0 left-0 right-0 top-0 transition-[padding]", {
          "fixed z-50 p-2 lg:p-8": isOpen,
        })}
        layout
        transition={transition}
      >
        <div className="relative h-full w-full">
          <video
            playsInline
            autoPlay
            controls={isOpen}
            muted={!isOpen}
            loop={!isOpen}
            controlsList="nodownload noremoteplayback"
            src={src}
            className="absolute left-0 top-0 h-full w-full rounded-2xl object-cover"
            onClick={(e) => {
              // TODO: Fix closing bug on iPad
              e.preventDefault();
              setOpen(!isOpen);
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};
