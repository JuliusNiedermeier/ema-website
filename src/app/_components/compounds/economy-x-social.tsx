"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Container } from "../primitives/container";
import { MergingPaths } from "./merging-paths";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { useScroll } from "framer-motion";

export type EconomyXSocialProps = ComponentProps<"div"> & {
  headingUpper: string;
  headingLower: string;
  previewText: string;
  readMoreButtonLabel: string;
};

export const EconomyXSocial: FC<EconomyXSocialProps> = ({
  className,
  headingUpper,
  headingLower,
  previewText,
  readMoreButtonLabel,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "20% start"],
  });

  return (
    <div className={cn("", className)} {...restProps}>
      <Container width="narrow" className="text-center">
        <Heading>{headingUpper}</Heading>
      </Container>
      <MergingPaths ref={containerRef} progress={scrollYProgress} className="-my-[10vw]" />
      <Container width="narrow" className="flex flex-col items-center text-center">
        <Heading>{headingLower}</Heading>
        <Paragraph>{previewText}</Paragraph>
        <Button className="mt-8">
          <Label>{readMoreButtonLabel}</Label>
          <ButtonInteractionBubble />
        </Button>
      </Container>
    </div>
  );
};
