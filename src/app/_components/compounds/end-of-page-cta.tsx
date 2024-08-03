import { ChevronDownIcon } from "lucide-react";
import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Container } from "../primitives/container";
import { Heading, Paragraph } from "../primitives/typography";

export type EndOfPageCTAProps = ComponentProps<"div"> & {
  heading: string;
  description: string;
};

export const EndOfPageCTA: FC<EndOfPageCTAProps> = ({ className, children, heading, description, ...restProps }) => {
  return (
    <div className={cn("", className)} {...restProps}>
      <div className="flex flex-col items-center">
        <div className="h-48 w-px bg-gradient-to-b from-transparent to-primary-900" />
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-900">
          <ChevronDownIcon className="text-primary-900-text" />
        </div>
      </div>
      <Container width="narrow" className="mt-24 text-center">
        <Heading>{heading}</Heading>
        <Paragraph>{description}</Paragraph>
      </Container>
      <div className="mt-24">{children}</div>
    </div>
  );
};
