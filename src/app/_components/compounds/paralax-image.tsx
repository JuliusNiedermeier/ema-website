"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";

export type ParalaxContainerProps = ComponentProps<typeof motion.div> & {};

export const ParalaxContainer: FC<ParalaxContainerProps> = ({ className, children, ...restProps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const yOffset = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <motion.div ref={containerRef} className={cn("", className)} style={{ y: yOffset, scale }} {...restProps}>
      {children}
    </motion.div>
  );
};
