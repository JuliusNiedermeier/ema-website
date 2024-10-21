import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "./card";
import { Heading, Label, Paragraph } from "../primitives/typography";

export type LinkCardProps = ComponentProps<typeof Card> & {};

export const LinkCard: FC<LinkCardProps> = ({ className, ...restProps }) => {
  return (
    <Card
      className={cn(
        "group flex items-center gap-6 border border-neutral-900/50 bg-neutral-100 p-6 transition-colors hover:bg-neutral-400",
        className,
      )}
      {...restProps}
    />
  );
};

export type LinkCardContentProps = ComponentProps<"div"> & {};

export const LinkCardContent: FC<LinkCardContentProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex min-w-0 flex-1 flex-col gap-1 overflow-hidden py-1", className)} {...restProps} />;
};

export type LinkCardLabelProps = ComponentProps<typeof Label> & {};

export const LinkCardLabel: FC<LinkCardLabelProps> = ({ className, ...restProps }) => {
  return <Label className={cn("text-neutral-100-text-muted", className)} {...restProps} />;
};

export type LinkCardTitleProps = ComponentProps<typeof Heading> & {};

export const LinkCardTitle: FC<LinkCardTitleProps> = ({ className, ...restProps }) => {
  return (
    <Heading
      tag="h3"
      size="sm"
      className={cn("my-0 mt-1 overflow-hidden truncate text-ellipsis whitespace-nowrap", className)}
      {...restProps}
    />
  );
};

export type LinkCardSubtitleProps = ComponentProps<typeof Paragraph> & {};

export const LinkCardSubtitle: FC<LinkCardSubtitleProps> = ({ className, ...restProps }) => {
  return (
    <Paragraph
      className={cn("my-0 overflow-hidden truncate text-ellipsis whitespace-nowrap leading-snug", className)}
      {...restProps}
    />
  );
};
