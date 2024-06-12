import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { Card } from "../primitives/card";
import { InteractionBubble } from "../compounds/interaction-bubble";

export type EconomyXSocialProps = ComponentProps<"div"> & {};

export const EconomyXSocial: FC<EconomyXSocialProps> = ({ className, ...restProps }) => {
  return (
    <Card
      className={cn("group flex flex-col items-center border bg-neutral-100 text-center", className)}
      {...restProps}
    >
      <Heading>Wirtschaftlich und Sozial denken.</Heading>
      <Paragraph className="max-w-[40rem]">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum saepe, tempore cupiditate distinctio nulla ab
        magnam aspernatur suscipit architecto corrupti animi fugit excepturi mollitia facere laudantium blanditiis
        dignissimos vero nam.
      </Paragraph>
      <div className="mx-auto mt-8 flex h-8 items-center gap-4">
        <InteractionBubble />
        <Label>Mehr erfahren</Label>
      </div>
    </Card>
  );
};
