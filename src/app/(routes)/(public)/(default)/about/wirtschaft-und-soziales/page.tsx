import { groq } from "next-sanity";
import { FC } from "react";
import { EconomyXSocialHero } from "~/app/_components/compounds/economy-x-social-hero";
import { sanity } from "~/sanity/lib/client";
import { EconomySocialPageQueryResult } from "../../../../../../../generated/sanity/types";
import { Container } from "~/app/_components/primitives/container";
import { DefaultPortableContent } from "~/app/_components/compounds/default-portable-content";

const economySocialPageQuery = groq`*[_type == "economy-social-page"][0] {
  ...,
  content[] {
    ...,
      _type == "portableImage" => {
        ...,
        asset -> { url }
      },
      _type == "portableEducationalProgramTypeCTA" => {
        ...,
        educationalProgramType -> {
          name,
          promotionalHeadline,
          color,
          slug,
          readMoreLabel
        }
      },
      _type == "portableEducationalProgramCTA" => {
        ...,
        educationalProgram -> {
          name,
          promotionalHeadline,
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
        <DefaultPortableContent content={data?.content || []} />
      </Container>
    </>
  );
};

export default EconomyXSocialPage;
