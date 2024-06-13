"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Container } from "../primitives/container";
import { MergingPaths } from "../compounds/merging-paths";
import { Button, ButtonInteractionBubble } from "../primitives/button";
import { useScroll } from "framer-motion";

export type EconomyXSocialProps = ComponentProps<"div"> & {};

export const EconomyXSocial: FC<EconomyXSocialProps> = ({ className, ...restProps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "20% start"],
  });

  return (
    <div className={cn("", className)} {...restProps}>
      <Container width="narrow" className="text-center">
        <Heading>Wir verbinden</Heading>
      </Container>
      <MergingPaths
        ref={containerRef}
        progress={scrollYProgress}
        className="-my-[10vw]"
        title="Wirtschaft X Social"
        description="Wirtschaft und Soziales verbinden."
      />
      <Container width="narrow" className="flex flex-col items-center text-center">
        <Heading>Wirtschaft & Soziales</Heading>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae tenetur a et asperiores veritatis, aliquam
          molestias laboriosam beatae, nostrum enim quis, consequuntur voluptate! Magnam, pariatur debitis tenetur
          quisquam obcaecati aut.
        </Paragraph>
        <Button className="mt-8">
          <Label>Mehr lesen</Label>
          <ButtonInteractionBubble />
        </Button>
      </Container>
    </div>
  );
};
