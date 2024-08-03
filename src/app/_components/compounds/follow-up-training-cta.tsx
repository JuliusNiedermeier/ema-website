import { ChevronDownIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { Heading, Paragraph } from "../primitives/typography";

export type FollowUpTrainingCTAProps = ComponentProps<"div"> & {
  heading: string;
  description: string;
};

export const FollowUpTrainingCTA: FC<FollowUpTrainingCTAProps> = ({
  className,
  children,
  heading,
  description,
  ...restProps
}) => {
  return (
    <div className={cn("", className)} {...restProps}>
      <Container width="narrow" className="text-center">
        <Heading>{heading}</Heading>
        <Paragraph>{description}</Paragraph>
      </Container>

      <div className="flex flex-col items-center">
        <div className="h-32 w-px bg-gradient-to-b from-transparent to-primary-900" />
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-900">
          <ChevronDownIcon className="text-primary-900-text" />
        </div>
      </div>

      <div className="mt-12">{children}</div>
    </div>
  );
};
