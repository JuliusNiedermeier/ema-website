import { ArrowRightIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";

export type InteractionBubbleProps = ComponentProps<"div"> & {};

export const InteractionBubble: FC<InteractionBubbleProps> = ({ className, ...restProps }) => {
  return (
    <div
      className={cn(
        "inline-block relative w-0 h-0 opacity-0 rounded-full overflow-hidden bg-primary-900 text-primary-900-text transition-all duration-200 group-hover:w-8 group-hover:h-8 group-hover:opacity-100",
        className,
      )}
      {...restProps}
    >
      <ArrowRightIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-180 group-hover:-rotate-45 transition-all duration-300" />
    </div>
  );
};
