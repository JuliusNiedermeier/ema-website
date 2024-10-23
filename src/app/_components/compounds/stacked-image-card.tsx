import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { mapRange } from "~/app/_utils/map-range";
import { SanityImage, SanityImageData } from "../primitives/sanity-image";

export type StackedImageCardProps = Omit<ComponentProps<"div">, "children"> & {
  images: SanityImageData[];
};

export const StackedImageCard: FC<StackedImageCardProps> = ({ className, images, ...restProps }) => {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl bg-neutral-200", className)} {...restProps}>
      {images.toReversed().map((image, index, array) => {
        const hoveringOffsetPercentage = mapRange(index, [-1, array.length - 1], [0, 0.4]);
        const offsetPercentage = mapRange(index, [-1, array.length - 1], [0, 0.5]);
        const sizePercentage = mapRange(index, [-1, array.length - 1], [1, 0.6]);
        return (
          <div
            key={index}
            className="absolute left-[var(--offset)] top-[var(--offset)] h-[var(--size)] w-[var(--size)] overflow-hidden rounded-tl-2xl border-l border-t transition-[top,left] group-hover:left-[var(--hover-offset)] group-hover:top-[var(--hover-offset)]"
            style={{
              "--offset": `${offsetPercentage * 100}%`,
              "--hover-offset": `${hoveringOffsetPercentage * 100}%`,
              "--size": `${sizePercentage * 100}%`,
            }}
          >
            <SanityImage image={image} fill className="h-full w-full object-cover" />
          </div>
        );
      })}
    </div>
  );
};
