"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Paragraph } from "../primitives/typography";
import { Container } from "../primitives/container";
import { MergingPaths } from "./merging-paths";
import { useScroll, useTransform } from "framer-motion";

export type EconomyXSocialHeroProps = ComponentProps<"div"> & {
  headingUpper: string;
  headingLower: string;
  description: string;
};

export const EconomyXSocialHero: FC<EconomyXSocialHeroProps> = ({
  className,
  headingUpper,
  headingLower,
  description,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const reversedProgress = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className={cn("rounded-b-2xl bg-neutral-200 pb-16", className)} {...restProps} ref={containerRef}>
      <Container width="narrow" className="pt-32 text-center">
        <Heading tag="h2">{headingUpper}</Heading>
        <Heading tag="h2">{headingLower}</Heading>
        <Paragraph>{description}</Paragraph>
      </Container>
      <MergingPaths progress={reversedProgress} className="mt-16" />
    </div>
  );
};
