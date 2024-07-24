import { groq } from "next-sanity";
import { FC } from "react";
import { EconomyXSocialHero } from "~/app/_components/compounds/economy-x-social-hero";
import { sanity } from "~/sanity/lib/client";
import { EconomySocialPageQueryResult } from "../../../../../../../generated/sanity/types";
import { Container } from "~/app/_components/primitives/container";
import { BlockContent } from "~/app/_components/compounds/block-content";

const economySocialPageQuery = groq`*[_type == "economy-social-page"][0] {
  ...,
  content[] {
    ...,
    _type == "image" => {
      ...,
      asset -> { url }
    },
    _type == "educationalProgramTypeCTA" => {
      ...,
      educationalProgramType -> {
        name,
        promotionalHeadline,
        color,
        slug,
        readMoreLabel
      }
    },
    _type == "educationalProgramCTA" => {
      ...,
      educationalProgram -> {
        name,
        promotionalHeadline,
        color,
        slug,
        readMoreLabel,
        educationalProgramType -> {
          name,
          color
        }
      }
    }
  }
}`;

const EconomyXSocialPage: FC = async () => {
  const data = await sanity.fetch<EconomySocialPageQueryResult>(
    economySocialPageQuery,
    {},
    { next: { tags: ["economy-social-page"] } },
  );

  return (
    <>
      <EconomyXSocialHero
        headingUpper={data?.headingUpper || ""}
        headingLower={data?.headingLower || ""}
        description={data?.previewText || ""}
      />
      <Container width="narrow" className="my-32">
        <BlockContent blockContent={data?.content || []} />
      </Container>
    </>
  );
};

export default EconomyXSocialPage;
