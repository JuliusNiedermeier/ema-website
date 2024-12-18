import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { Heading, Label, Paragraph } from "../primitives/typography";
import { SanityImage, SanityImageData } from "../primitives/sanity-image";

export type ArtEducationProps = ComponentProps<"div"> & {
  leftImage?: SanityImageData | null;
  rightImage?: SanityImageData | null;
  backgroundImage?: SanityImageData | null;
  title: string;
  body: string;
  actionLabel: string;
};

export const ArtEducation: FC<ArtEducationProps> = ({
  className,
  leftImage,
  rightImage,
  backgroundImage,
  title,
  body,
  actionLabel,
  ...restProps
}) => {
  return (
    <div className={cn("group relative block w-full overflow-hidden rounded-2xl", className)} {...restProps}>
      <div className="relative z-10 bg-neutral-900/10 p-4 sm:p-8">
        <Heading tag="h2" size="sm" className="mt-8 sm:text-heading-lg">
          {title}
        </Heading>
        <Paragraph className="max-w-96">{body}</Paragraph>
        <div className="mt-80 flex h-12 w-fit items-center gap-4 rounded-full bg-neutral-100 px-2 pr-6">
          <InteractionBubble /> <Label>{actionLabel}</Label>
        </div>
      </div>
      <SanityImage
        width={1920}
        height={1080}
        image={backgroundImage}
        className="absolute left-0 top-0 h-full w-full origin-left object-cover transition-all group-hover:scale-[1.1]"
      />
      <SanityImage
        width={500}
        height={500}
        image={rightImage}
        className="absolute -right-8 bottom-0 h-[65vw] max-h-80 w-min object-cover transition-all group-hover:translate-x-10 group-hover:scale-[1.5]"
      />
      <SanityImage
        width={500}
        height={500}
        image={leftImage}
        className="absolute bottom-0 right-[10vw] h-[80vw] max-h-96 w-min object-cover transition-all group-hover:-translate-x-10 group-hover:scale-[1.1]"
      />
    </div>
  );
};
