"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";

export type ParalaxContainerProps = ComponentProps<typeof motion.div> & {
  shift?: number;
  scale?: number;
};

export const ParalaxContainer: FC<ParalaxContainerProps> = ({
  className,
  children,
  shift = 200,
  scale = 1.2,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"], smooth: 1 });

  const yOffsetValue = useTransform(scrollYProgress, [0, 1], [-shift, shift]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [1, scale]);

  return (
    <motion.div
      ref={containerRef}
      className={cn("", className)}
      style={{ y: yOffsetValue, scale: scaleValue }}
      {...restProps}
    >
      {children}
    </motion.div>
  );
};
