import { groq } from "next-sanity";
import { FC } from "react";
import { EconomyXSocialHero } from "~/app/_components/compounds/economy-x-social-hero";
import { sanity } from "~/sanity/lib/client";
import { EconomySocialPageQueryResult } from "../../../../../../../generated/sanity/types";
import { Container } from "~/app/_components/primitives/container";
import { DefaultPortableContent } from "~/app/_components/compounds/default-portable-content";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { ChevronDownIcon } from "lucide-react";
import { notFound } from "next/navigation";

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

  if (!data) notFound();

  return (
    <>
      <EconomyXSocialHero
        headingUpper={data.headingUpper || ""}
        headingLower={data.headingLower || ""}
        description={data.previewText || ""}
      />
      <Container width="narrow" className="my-32">
        <DefaultPortableContent content={data.content || []} />
      </Container>
      <Container className="mt-48">
        <div className="flex flex-col items-center">
          <div className="h-48 w-px bg-gradient-to-b from-transparent to-primary-900" />
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-900">
            <ChevronDownIcon className="text-primary-900-text" />
          </div>
        </div>
        <Container width="narrow" className="mt-24 text-center">
          <Heading>{data.educationalProgramTypesCTA?.heading}</Heading>
          <Paragraph>{data.educationalProgramTypesCTA?.description}</Paragraph>
        </Container>
        <EducationalProgramTypeCards className="mt-24" />
      </Container>
    </>
  );
};

export default EconomyXSocialPage;
