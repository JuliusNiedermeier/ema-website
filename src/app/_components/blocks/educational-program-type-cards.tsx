import { ComponentProps, FC } from "react";
import { InteractionBubble } from "../compounds/interaction-bubble";
import Link from "next/link";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { EducationalProgramTypeCardsQueryResult } from "../../../../generated/sanity/types";
import { createColorThemeStyles, ensureValidHSL } from "~/app/_utils/color-swatch";
import { LinkCard, LinkCardContent, LinkCardSubtitle, LinkCardTitle } from "../primitives/link-card";
import { LinkCardCollection } from "../primitives/link-card-collection";

export type EducationalProgramTypeCardsProps = ComponentProps<typeof LinkCardCollection> & {
  filter?: {
    excludeSlugs?: string[];
  };
};

const educationalProgramTypeCardsQuery = groq`*[_type == "educational-program-type" && !(slug.current in $excludeSlugs)]{
  ...
}`;

export const EducationalProgramTypeCards: FC<EducationalProgramTypeCardsProps> = async ({ filter, ...restProps }) => {
  const programTypes = await sanityFetch<EducationalProgramTypeCardsQueryResult>(educationalProgramTypeCardsQuery, {
    params: { excludeSlugs: filter?.excludeSlugs || [] },
    tags: ["educational-program-type"],
  });

  return (
    <LinkCardCollection {...restProps}>
      {programTypes.map((type) => (
        <Link href={`/bildungswege/${type.slug?.current}`}>
          <LinkCard style={createColorThemeStyles(ensureValidHSL(type.color?.hsl))}>
            <InteractionBubble animated={false} className="bg-themed-primary text-primary-900" />
            <LinkCardContent>
              <LinkCardTitle>{type.name}</LinkCardTitle>
              <LinkCardSubtitle>{type.introduction}</LinkCardSubtitle>
            </LinkCardContent>
          </LinkCard>
        </Link>
      ))}
    </LinkCardCollection>
  );
};
