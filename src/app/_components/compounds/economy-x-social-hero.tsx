"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Paragraph } from "../primitives/typography";
import { Container } from "../primitives/container";
import { MergingPaths } from "./merging-paths";
import { useScroll, useTransform } from "framer-motion";

export type EconomyXSocialHeroProps = ComponentProps<"div"> & {
  heading: string;
  description: string;
};

export const EconomyXSocialHero: FC<EconomyXSocialHeroProps> = ({ className, heading, description, ...restProps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const reversedProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className={cn("pt-60", className)} {...restProps} ref={containerRef}>
      <Container width="narrow" className="text-center">
        <Heading>{heading}</Heading>
        <Paragraph>{description}</Paragraph>
      </Container>
      <MergingPaths progress={reversedProgress} className="mt-16" />
    </div>
  );
};
