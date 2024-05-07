import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, FC, forwardRef } from "react";
import { cn } from "~/app/_utils/cn";

export type CardCarouselProps = ComponentProps<"div"> & {};

export const CardCarousel: FC<CardCarouselProps> = forwardRef(({ className, ...restProps }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex snap-x snap-mandatory gap-4 overflow-x-auto rounded-2xl", className)}
      {...restProps}
    />
  );
});

CardCarousel.displayName = "CardCarousel";

export type CardCarouselItemProps = ComponentProps<"div"> & {
  asChild?: boolean;
};

export const CardCarouselItem: FC<CardCarouselItemProps> = ({ className, asChild, ...restProps }) => {
  const Component = asChild ? Slot : "div";
  return <Component className={cn("snap-start", className)} {...restProps} />;
};
