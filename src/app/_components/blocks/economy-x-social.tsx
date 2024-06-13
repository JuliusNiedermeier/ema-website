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
        <Heading>Wirtschaftlich und Sozial denken.</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat molestiae temporibus amet ex quam nesciunt
          corporis voluptatem voluptas culpa, possimus error maxime. Temporibus ducimus corporis recusandae suscipit
          perferendis repudiandae culpa.
        </Paragraph>
      </Container>
      <MergingPaths
        ref={containerRef}
        progress={scrollYProgress}
        className=""
        title="Wirtschaft X Social"
        description="Wirtschaft und Soziales verbinden."
      />
      <Container className="flex justify-center">
        <Button>
          <Label>Mehr lesen</Label>
          <ButtonInteractionBubble />
        </Button>
      </Container>
    </div>
  );
};
