import { ArrowRightIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type InteractionBubbleProps = ComponentProps<"div"> & {
  animated?: boolean;
};

export const InteractionBubble: FC<InteractionBubbleProps> = ({ className, animated = true, ...restProps }) => {
  return (
    <div
      className={cn(
        "relative inline-block h-8 w-8 overflow-hidden rounded-full bg-primary-900 text-primary-900-text",
        {
          "h-0 w-0 opacity-0 transition-all duration-200 group-hover:h-8 group-hover:w-8 group-hover:opacity-100":
            animated,
        },
        className,
      )}
      {...restProps}
    >
      <ArrowRightIcon
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:-rotate-45",
          {
            "-rotate-180": animated,
          },
        )}
      />
    </div>
  );
};
