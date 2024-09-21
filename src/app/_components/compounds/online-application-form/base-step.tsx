import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Heading, Paragraph } from "../../primitives/typography";

export type BaseStepProps = ComponentProps<"div"> & {
  heading: string;
  description?: string;
};

export const BaseStep: FC<BaseStepProps> = ({ className, heading, description, children, ...restProps }) => {
  return (
    <div className={cn("", className)} {...restProps}>
      <div className="text-pretty">
        <Heading className="text-primary-900-text">{heading}</Heading>
        {description && <Paragraph className="text-neutral-900-text-muted">{description}</Paragraph>}
      </div>
      <div className="mt-8">{children}</div>
    </div>
  );
};
