import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type LinkCardCollectionProps = ComponentProps<"div"> & {};

export const LinkCardCollection: FC<LinkCardCollectionProps> = ({ className, ...restProps }) => {
  return (
    <div className={cn("flex flex-wrap items-stretch gap-4 [&>*]:min-w-80 [&>*]:flex-1", className)} {...restProps} />
  );
};
