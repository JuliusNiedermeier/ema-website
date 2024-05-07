import { StarIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type StarRatingProps = ComponentProps<"div"> & {
  rating: [number, number];
};

export const StarRating: FC<StarRatingProps> = ({ className, rating, ...restProps }) => {
  return (
    <div className={cn("flex items-center justify-end gap-2", className)} {...restProps}>
      {Array.from(new Array(rating[1])).map((_, index) => (
        <StarIcon
          size={16}
          className={cn({
            "text-primary-100-text": index < rating[0],
            "text-primary-100-text-muted": index >= rating[0],
          })}
        />
      ))}
    </div>
  );
};
