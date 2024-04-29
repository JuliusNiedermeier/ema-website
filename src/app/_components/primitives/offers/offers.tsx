import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Paragraph } from "../typography";
import { Card } from "../card";

export type OfferDescriptionProps = ComponentProps<typeof Paragraph> & {};

export const OfferDescription: FC<OfferDescriptionProps> = ({ className, ...restProps }) => {
  return <Paragraph className={cn("", className)} {...restProps} />;
};

export type OfferCardProps = ComponentProps<typeof Card> & {};

export const OfferCard: FC<OfferCardProps> = ({ className, ...restProps }) => {
  return <Card className={cn("flex-1 p-6", className)} {...restProps} />;
};

export type OfferGroupCollectionProps = ComponentProps<"div"> & {};

export const OfferGroupCollection: FC<OfferGroupCollectionProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex flex-col gap-4 sm:flex-row", className)} {...restProps} />;
};

export type OfferGroupDescriptionProps = ComponentProps<typeof Paragraph> & {};

export const OfferGroupDescription: FC<OfferGroupDescriptionProps> = ({ className, ...restProps }) => {
  return <Paragraph className={cn("", className)} {...restProps} />;
};

export type OfferGroupHeaderProps = ComponentProps<"div"> & {};

export const OfferGroupHeader: FC<OfferGroupHeaderProps> = ({ className, ...restProps }) => {
  return <div className={cn("px-6 py-8", className)} {...restProps} />;
};

export type OfferGroupTitleProps = ComponentProps<typeof Heading> & {};

export const OfferGroupTitle: FC<OfferGroupTitleProps> = ({ className, ...restProps }) => {
  return <Heading size="sm" className={cn("mb-0", className)} {...restProps} />;
};

export type OfferGroupVersionProps = ComponentProps<"div"> & {};

export const OfferGroupVersion: FC<OfferGroupVersionProps> = ({ className, ...restProps }) => {
  return <div className={cn("", className)} {...restProps} />;
};

export type OfferTitleProps = ComponentProps<typeof Heading> & {};

export const OfferTitle: FC<OfferTitleProps> = ({ className, ...restProps }) => {
  return <Heading size="lg" tag="h2" className={cn("", className)} {...restProps} />;
};
