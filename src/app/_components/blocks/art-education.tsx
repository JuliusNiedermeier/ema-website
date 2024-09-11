import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import Image from "next/image";
import { InteractionBubble } from "../compounds/interaction-bubble";
import { Heading, Label, Paragraph } from "../primitives/typography";

type ImageProps = { src: string; alt: string };

export type ArtEducationProps = ComponentProps<"div"> & {
  leftImage: ImageProps;
  rightImage: ImageProps;
  backgroundImage: ImageProps;
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
    <div className={cn("group relative block w-full overflow-hidden rounded-2xl p-4 sm:p-8", className)} {...restProps}>
      <Image
        width={1920}
        height={1080}
        src={backgroundImage.src}
        alt={backgroundImage.alt}
        className="absolute left-0 top-0 -z-10 h-full w-full origin-left object-cover transition-all group-hover:scale-[1.1]"
      />
      <Image
        width={500}
        height={500}
        src={rightImage.src}
        alt={rightImage.alt}
        className="absolute -right-8 bottom-0 -z-10 h-[65vw] max-h-80 w-min object-cover transition-all group-hover:translate-x-10 group-hover:scale-[1.5]"
      />
      <Image
        width={500}
        height={500}
        src={leftImage.src}
        alt={leftImage.src}
        className="absolute bottom-0 right-[10vw] -z-10 h-[80vw] max-h-96 w-min object-cover transition-all group-hover:-translate-x-10 group-hover:scale-[1.1]"
      />
      <Heading size="sm" className="mt-8 sm:text-heading-lg">
        {title}
      </Heading>
      <Paragraph className="max-w-96">{body}</Paragraph>
      <div className="mt-80 flex w-fit items-center gap-4 rounded-full bg-neutral-100 h-12 px-2 pr-6">
        <InteractionBubble /> <Label>{actionLabel}</Label>
      </div>
    </div>
  );
};
