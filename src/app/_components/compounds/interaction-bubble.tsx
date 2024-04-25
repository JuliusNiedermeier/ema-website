import { ArrowRightIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type InteractionBubbleProps = ComponentProps<"div"> & {};

export const InteractionBubble: FC<InteractionBubbleProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn(
        "relative inline-block h-0 w-0 overflow-hidden rounded-full bg-primary-900 text-primary-900-text opacity-0 transition-all duration-200 group-hover:h-8 group-hover:w-8 group-hover:opacity-100",
        className,
      )}
      {...restProps}
    >
      <ArrowRightIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-180 transition-all duration-300 group-hover:-rotate-45" />
    </div>
  );
};
