import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Label } from "./typography";
import { SanityImage } from "./sanity-image";

export type AuthorTagProps = ComponentProps<"div"> & {};

export const AuthorTag: FC<AuthorTagProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex items-center gap-2", className)} {...restProps} />;
};

export type AuthorTagImageProps = ComponentProps<typeof SanityImage> & {};

export const AuthorTagImage: FC<AuthorTagImageProps> = ({ className, width = 100, height = 100, ...restProps }) => {
  return <SanityImage width={width} height={height} className={cn("h-6 w-6 rounded-full", className)} {...restProps} />;
};

export type AuthorTagNameProps = ComponentProps<typeof Label> & {};

export const AuthorTagName: FC<AuthorTagNameProps> = ({ className, ...restProps }) => {
  return <Label className={cn("whitespace-nowrap", className)} {...restProps} />;
};
