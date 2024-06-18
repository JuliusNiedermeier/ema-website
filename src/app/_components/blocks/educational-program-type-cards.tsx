import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { Card } from "../primitives/card";
import { Heading, Paragraph } from "../primitives/typography";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanity } from "~/sanity/lib/client";
import { EducationalProgramTypeCardsQueryResult } from "../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";

export type EducationalProgramTypeCardsProps = ComponentProps<"div"> & {
  filter?: {
    excludeSlugs?: string[];
  };
};

const educationalProgramTypeCardsQuery = groq`*[_type == "educational-program-type" && !(slug.current in $excludeSlugs)]{
  ...
}`;

export const EducationalProgramTypeCards: FC<EducationalProgramTypeCardsProps> = async ({
  className,
  filter,
  ...restProps
}) => {
  const programTypes = await sanity.fetch<EducationalProgramTypeCardsQueryResult>(
    educationalProgramTypeCardsQuery,
    {
      excludeSlugs: filter?.excludeSlugs || [],
    },
    { next: { tags: ["educational-program-type"] } },
  );

  return (
    <div className={cn("flex flex-wrap items-stretch gap-4", className)} {...restProps}>
      {programTypes.map((type) => (
        <Card
          asChild
          key={type._id}
          className="group flex min-w-60 flex-1 flex-col bg-themed-secondary"
          style={createColorThemeStyles(ensureValidHSL(type.color?.hsl))}
        >
          <Link href={`/bildungswege/${type.slug?.current}`}>
            <Heading size="sm">{type.name}</Heading>
            <Paragraph className="mt-0 flex-1">{type.promotionalHeadline}</Paragraph>
            <InteractionBubble animated={false} className="mt-4" />
          </Link>
        </Card>
      ))}
    </div>
  );
};
