import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Chip } from "../primitives/chip";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { InteractionBubble } from "./interaction-bubble";

export type EducationalProgramCardProps = ComponentProps<typeof Card> & {
  programType: string;
  name: string;
  headline: string;
};

export const EducationalProgramCard: FC<EducationalProgramCardProps> = ({
  className,
  programType,
  name,
  headline,
  ...restProps
}) => {
  return (
    <Card className={cn("group flex flex-col bg-themed-primary", className)} {...restProps}>
      <Chip className="bg-themed-secondary">
        <Label>{programType}</Label>
      </Chip>
      <Heading tag="h3" size="lg" className="mt-8">
        {name}
      </Heading>
      <Paragraph className="flex-1">{headline}</Paragraph>
      <InteractionBubble animated={false} className="mt-8" />
    </Card>
  );
};
