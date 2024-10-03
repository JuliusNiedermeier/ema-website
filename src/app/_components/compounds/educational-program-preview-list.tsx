"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { createColorThemeStyles, HSLValue } from "~/app/_utils/color-swatch";
import { motion, MotionValue, useScroll, useTransform, transform, useSpring } from "framer-motion";
import { Container } from "../primitives/container";
import Image from "next/image";

export type EducationalProgramPreviewListProps = ComponentProps<"div"> & {
  programs: {
    slug: string;
    name: string;
    heading: string;
    description: string;
    readMoreLabel: string;
    imageURL: string;
    programType: { slug: string; name: string; color: HSLValue; readMoreLabel: string };
  }[];
};

export const EducationalProgramPreviewList: FC<EducationalProgramPreviewListProps> = ({
  className,
  programs,
  ...restProps
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    axis: "y",
    offset: ["start start", "end start"],
    smooth: 10,
  });

  const smoothYProgres = useSpring(scrollYProgress, {
    stiffness: 1000,
    damping: 200,
  });

  return (
    <div ref={containerRef} className={cn("", className)} {...restProps}>
      {programs.map((program, index) => (
        <Card
          key={program.slug}
          program={program}
          globalProgress={smoothYProgres}
          relativePlacement={index / programs.length}
        />
      ))}
    </div>
  );
};

type CardProps = Omit<ComponentProps<"div">, "cildren"> & {
  program: EducationalProgramPreviewListProps["programs"][number];
  globalProgress: MotionValue<number>;
  relativePlacement: number;
};

const damp = (start: number, end: number, effectStrength: number) => {
  const maxChange = start - end;
  return start - maxChange * effectStrength;
};

const Card: FC<CardProps> = ({ program, globalProgress, relativePlacement, style, ...restProps }) => {
  const effectStrength = 1 - relativePlacement;

  const progress = useTransform(globalProgress, [relativePlacement, 1], [0, 1]);

  const targetY = `-${damp(0, 30, effectStrength)}vh`;
  const y = useTransform(progress, (progressValue) => `calc(${progressValue} * ${targetY})`);

  const targetScale = damp(1, 0.6, effectStrength);
  const scale = useTransform(progress, [0, 1], [1, targetScale]);

  const targetBrightness = damp(1, 2, effectStrength);
  const targetSaturation = damp(1, 0.2, effectStrength);

  const filter = useTransform(progress, (progressValue) => {
    const brightness = transform(progressValue, [0, 1], [1, targetBrightness]);
    const saturation = transform(progressValue, [0, 1], [1, targetSaturation]);
    return `brightness(${brightness}) saturate(${saturation})`;
  });

  return (
    <Container
      width="medium"
      style={{ ...createColorThemeStyles(program.programType.color), ...style }}
      className="sticky top-0 h-screen"
      {...restProps}
    >
      <motion.div
        style={{ y, scale, filter }}
        className="absolute bottom-8 w-full overflow-hidden rounded-3xl border-2 border-themed-secondary bg-themed-primary md:rounded-[3rem]"
      >
        <div className="flex h-[70vh] flex-col p-2 md:flex-row-reverse md:p-8">
          <div className="h-fit flex-1 p-6">
            <Label className="inline-block rounded-full border border-neutral-400/20 bg-themed-secondary px-4 py-2 shadow">
              {program.programType.name}
            </Label>
            <Heading size="lg" className="line-clamp-2 break-words">
              {program.name}
            </Heading>
            <Paragraph className="line-clamp-3">{program.description}</Paragraph>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-themed-secondary">
            <Image
              src={program.imageURL}
              alt={program.name}
              fill
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </Container>
  );
};
