import { groq } from "next-sanity";
import { FC } from "react";
import { EconomyXSocialHero } from "~/app/_components/compounds/economy-x-social-hero";
import { sanity } from "~/sanity/lib/client";
import { EconomySocialPageQueryResult } from "../../../../../../../generated/sanity/types";
import { Container } from "~/app/_components/primitives/container";
import { Paragraph } from "~/app/_components/primitives/typography";

const economySocialPageQuery = groq`*[_type == "economy-social-page"][0]`;

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
        <Paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, dolorem. Itaque quae quo illum
          perspiciatis nam ad quod quas, optio omnis autem explicabo totam accusantium esse ut nesciunt architecto
          earum.
        </Paragraph>
      </Container>
    </>
  );
};

export default EconomyXSocialPage;
