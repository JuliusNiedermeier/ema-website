"use client";

import { ComponentProps, FC, useRef } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export type CertificateProps = ComponentProps<typeof Card> & {
  heading: string;
  name: string;
  description: string;
  qualifications: string[];
  jobs: { image: string; content: string }[];
};

export const Certificate: FC<CertificateProps> = ({
  className,
  heading,
  name,
  description,
  qualifications,
  jobs,
  ...restProps
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ axis: "y", target: cardRef, offset: ["start end", "end start"] });
  const paralaxx = useTransform(scrollYProgress, [0, 1], [-300, 300]);

  return (
    <Card
      ref={cardRef}
      className={cn("grid items-center gap-16 overflow-hidden py-0 sm:grid-cols-[2fr_1fr]", className)}
      {...restProps}
    >
      <div className="overflow-hidden py-8">
        <div className="flex w-[fit-content] items-center gap-4 rounded-full bg-themed-secondary px-4 py-2">
          <ChevronRightIcon />
          <Label>{heading}</Label>
        </div>
        <Heading tag="h3" className="mt-8 break-words">
          {name}
        </Heading>
        <Paragraph className="mt-8">{description}</Paragraph>

        <div className="mt-8">
          {qualifications.map((qualification, index) => (
            <div key={index} className="flex items-center gap-4">
              <CheckIcon />
              <Label>{qualification}</Label>
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-full min-h-[30rem] overflow-hidden">
        <motion.div
          className="absolute left-0 top-0 flex h-full w-full flex-col justify-center gap-4"
          style={{ y: paralaxx }}
        >
          {jobs.map((job, index) => (
            <div key={index} className="flex gap-4 rounded-[2rem] border border-neutral-400 bg-neutral-100 p-4">
              <Image
                src={job.image}
                alt={job.content}
                height={300}
                width={300}
                className="aspect-square w-12 rounded-full object-cover"
              />
              <Paragraph>{job.content}</Paragraph>
            </div>
          ))}
        </motion.div>
        <div className="left- 0 absolute top-0 h-full w-full bg-gradient-to-b from-neutral-200 to-transparent sm:hidden"></div>
      </div>
    </Card>
  );
};
