"use client";

import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { EducationalProgramCard } from "../educational-program-card";
import { createColorThemeStyles } from "~/app/_utils/color-swatch";
import Link from "next/link";
import { useCheckupForm } from "./checkup-form-provider";
import { Card } from "../../primitives/card";
import { Heading, Label, Paragraph } from "../../primitives/typography";
import { Button } from "../../primitives/button";
import { InteractionBubble } from "../interaction-bubble";

export type CheckupResultsProps = ComponentProps<"div"> & {
  placeholder: {
    heading: string;
    description: string;
    contactLinkLabel: string;
  };
};

export const CheckupResults: FC<CheckupResultsProps> = ({ className, placeholder, ...restProps }) => {
  const { results } = useCheckupForm();

  if (!results.length) {
    return (
      <Card className={cn("border bg-transparent", className)} {...restProps}>
        <Heading size="sm" className="max-w-96">
          {placeholder.heading}
        </Heading>
        <Paragraph className="m-0">{placeholder.description}</Paragraph>
        <Button size="sm" href="/kontakt" className="mt-8">
          <Label>{placeholder.contactLinkLabel}</Label>
          <InteractionBubble animated={false} />
        </Button>
      </Card>
    );
  }

  return (
    <div className={cn("flex flex-col gap-4", className)} {...restProps}>
      {results.map((program) => (
        <Link href={`/bildungswege/${program.programType.slug}/${program.slug}`}>
          <EducationalProgramCard
            headline={program.slogan}
            name={program.name}
            programType={program.programType.name}
            style={createColorThemeStyles(program.color)}
          />
        </Link>
      ))}
    </div>
  );
};
