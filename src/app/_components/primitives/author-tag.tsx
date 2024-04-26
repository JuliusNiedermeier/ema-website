import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { Label } from "./typography";

export type AuthorTagProps = ComponentProps<"div"> & {};

export const AuthorTag: FC<AuthorTagProps> = ({ className, ...restProps }) => {
  return <div className={cn("flex items-center gap-2", className)} {...restProps} />;
};

export type AuthorTagImageProps = ComponentProps<typeof Image> & {};

export const AuthorTagImage: FC<AuthorTagImageProps> = ({ className, width = 100, height = 100, ...restProps }) => {
  return (
    <Image
      width={width}
      height={height}
      className={cn("h-6 w-6 rounded-full object-cover", className)}
      {...restProps}
    />
  );
};

export type AuthorTagNameProps = ComponentProps<typeof Label> & {};

export const AuthorTagName: FC<AuthorTagNameProps> = ({ className, ...restProps }) => {
  return <Label className={cn("whitespace-nowrap", className)} {...restProps} />;
};
