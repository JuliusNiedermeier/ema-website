import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "./card";
import Image from "next/image";
import { Chip } from "./chip";
import { Heading, Label, Paragraph } from "./typography";
import { SanityImage } from "./sanity-image";

export type PostCardProps = ComponentProps<typeof Card> & {};

export const PostCard: FC<PostCardProps> = ({ className, ...restProps }) => {
  return (
    <Card
      className={cn("group h-full min-w-60 rounded-3xl border border-neutral-900/10 bg-neutral-200 p-2", className)}
      {...restProps}
    />
  );
};

export type PostCardThumbnailProps = ComponentProps<"div"> & {};

export const PostCardThumbnail: FC<PostCardThumbnailProps> = ({ className, ...restProps }) => {
  return <div className={cn("relative", className)} {...restProps} />;
};

export type PostCardThumbnailImageProps = ComponentProps<typeof SanityImage> & {};

export const PostCardThumbnailImage: FC<PostCardThumbnailImageProps> = ({
  className,
  width = 500,
  height = 500,
  ...restProps
}) => {
  return (
    <SanityImage
      className={cn("aspect-video w-full rounded-2xl", className)}
      width={width}
      height={height}
      {...restProps}
    />
  );
};

export type PostCardThumbnailTagProps = ComponentProps<typeof Chip> & {};

export const PostCardThumbnailTag: FC<PostCardThumbnailTagProps> = ({ className, ...restProps }) => {
  return <Chip className={cn("absolute bottom-2 left-2", className)} {...restProps} />;
};

export type PostCardTitleProps = ComponentProps<typeof Heading> & {};

export const PostCardTitle: FC<PostCardTitleProps> = ({ className, size = "sm", ...restProps }) => {
  return <Heading tag="h3" size={size} className={cn("", className)} {...restProps} />;
};

export type PostCardMetaProps = ComponentProps<"div"> & {};

export const PostCardMeta: FC<PostCardMetaProps> = ({ className, ...restProps }) => {
  return <div className={cn("mt-2 flex items-center gap-2", className)} {...restProps} />;
};

export type PostCardMetaDateProps = ComponentProps<typeof Label> & {};

export const PostCardMetaDate: FC<PostCardMetaDateProps> = ({ className, ...restProps }) => {
  return <Label className={cn("whitespace-nowrap", className)} {...restProps} />;
};

export type PostCardMetaSeparatorProps = ComponentProps<"span"> & {};

export const PostCardMetaSeparator: FC<PostCardMetaSeparatorProps> = ({ className, ...restProps }) => {
  return <span className={cn("h-1 w-1 rounded-full bg-neutral-200-text-muted", className)} {...restProps} />;
};

export type PostCardExcerptProps = ComponentProps<typeof Paragraph> & {};

export const PostCardExcerpt: FC<PostCardExcerptProps> = ({ className, ...restProps }) => {
  return <Paragraph className={cn("text-neutral-200-text-muted", className)} {...restProps} />;
};

export type PostCardContentProps = ComponentProps<"div"> & {};

export const PostCardContent: FC<PostCardContentProps> = ({ className, ...restProps }) => {
  return <div className={cn("p-6", className)} {...restProps} />;
};
