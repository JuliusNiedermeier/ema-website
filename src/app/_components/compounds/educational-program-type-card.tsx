import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { InteractionBubble } from "./interaction-bubble";

export type EducationalProgramTypeCardProps = ComponentProps<typeof Card> & {
  name: string;
  description: string;
};

export const EducationalProgramTypeCard: FC<EducationalProgramTypeCardProps> = ({
  className,
  name,
  description,
  ...restProps
}) => {
  return (
    <Card className={cn("group flex flex-col bg-themed-primary", className)} {...restProps}>
      <Heading size="sm">{name}</Heading>
      <Paragraph className="mt-0 flex-1">{description}</Paragraph>
      <InteractionBubble animated={false} className="mt-4" />
    </Card>
  );
};
