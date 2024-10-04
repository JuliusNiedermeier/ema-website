"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { InteractionBubble } from "./interaction-bubble";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";
import { Button } from "../primitives/button";
import Image from "next/image";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import Link from "next/link";

export type EducationalProgramTypePreviewListProps = ComponentProps<"div"> & {
  programTypes: {
    slug: string;
    color: HSLValue;
    name: string;
    heading: string;
    description: string;
    readMoreLabel: string;
    programs: {
      slug: string;
      name: string;
      heading: string;
      description: string;
      image: { url: string; alt: string };
    }[];
  }[];
};

export const EducationalProgramTypePreviewList: FC<EducationalProgramTypePreviewListProps> = ({
  className,
  programTypes,
  ...restProps
}) => {
  return (
    <div className={cn("relative", className)} {...restProps}>
      {programTypes.map((programType, index) => (
        <Section key={programType.slug} programType={programType} index={index} />
      ))}
    </div>
  );
};

const Section: FC<{ programType: EducationalProgramTypePreviewListProps["programTypes"][0]; index: number }> = ({
  programType,
  index,
}) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // const sheetScroll = useScroll({ target: sheetRef, axis: "y", offset: ["start end", "end end"] });

  const { scrollYProgress: listScrollThroughProgress } = useScroll({
    target: listRef,
    axis: "y",
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: listScrollInProgress } = useScroll({
    target: listRef,
    axis: "y",
    offset: ["start end", "start start"],
  });

  const sheetScale = useTransform(listScrollThroughProgress, [0, 1], [1, 0.95]);

  const sheetContentOpacity = useTransform(listScrollInProgress, [0, 1], [1, 0]);

  const cssVariables = {
    "--sheet-height": "calc(80vh + 4rem)", // + 4rem to make sheet overlap 4rem at the bottom of the screen
    "--sheet-offset-top": "20vh",
  };

  return (
    <>
      <motion.div
        ref={sheetRef}
        style={{ ...createColorThemeStyles(programType.color), scale: sheetScale, ...cssVariables }}
        className={cn(
          "sticky top-[var(--sheet-offset-top)] flex h-[var(--sheet-height)] origin-bottom rounded-t-[2rem] bg-themed-primary md:rounded-t-[4rem]",
        )}
      >
        <Container className={cn("py-12 md:py-24")}>
          <motion.div
            className={cn("px-4 text-center md:w-1/3 md:px-0 md:text-left md:!opacity-100", {
              "ml-auto": index % 2 !== 0,
            })}
            style={{ opacity: sheetContentOpacity }}
          >
            <Label className="inline-block rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
              {programType.name}
            </Label>
            <Heading size="lg" className="mt-6">
              {programType.heading}
            </Heading>
            <Paragraph className="line-clamp-3">{programType.description}</Paragraph>
            <Button size="sm" vairant="outline" className="mx-auto mt-8 gap-4 pl-1 md:mx-0">
              <InteractionBubble animated={false} />
              <Label>{programType.readMoreLabel}</Label>
            </Button>
          </motion.div>
        </Container>
      </motion.div>
      <Container
        ref={listRef}
        className="pointer-events-none relative z-10 -mt-[30vh] md:-mt-[var(--sheet-height)]"
        style={{ ...createColorThemeStyles(programType.color), ...cssVariables }}
      >
        <div
          className={cn("pointer-events-auto flex min-h-[var(--sheet-height)] flex-col gap-8 py-[4rem] md:w-1/2", {
            "ml-auto": index % 2 === 0,
          })}
        >
          {programType.programs.map((program, index, programs) => (
            <Link key={program.slug} href={`/bildungswege/${programType.slug}/${program.slug}`}>
              <ProgramCard
                program={program}
                index={index}
                range={[index / programs.length, 1]}
                listScrollProgress={listScrollThroughProgress}
              />
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
};

const ProgramCard: FC<{
  program: EducationalProgramTypePreviewListProps["programTypes"][0]["programs"][0];
  index: number;
  range: [number, number];
  listScrollProgress: MotionValue<number>;
}> = ({ index, program, listScrollProgress, range }) => {
  // const scale = useTransform(listScrollProgress, range, [1, 0.9]);

  return (
    <motion.div
      key={program.slug}
      className={cn(
        // "sticky top-[calc(var(--sheet-offset-top)_+_4rem)]",
        // "h-[calc(80vh_-_2_*_4rem)]",
        "group flex flex-col rounded-3xl bg-themed-secondary p-2",
      )}
      // style={{ scale }}
    >
      <div className="p-6">
        <Label className="inline-block rounded-full border border-neutral-100/10 bg-themed-secondary px-4 py-2 shadow brightness-105">
          {program.name}
        </Label>
        <Heading size="sm" className="mt-6">
          {program.heading}
        </Heading>
        <Paragraph className="line-clamp-3">{program.description}</Paragraph>
      </div>
      {program.image && (
        <div className="relative aspect-video max-h-[40vh] flex-1">
          <Image
            src={program.image.url}
            alt={program.image.alt}
            height="500"
            width="500"
            className="h-full w-full rounded-2xl object-cover"
          />
          <InteractionBubble className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
      )}
    </motion.div>
  );
};
