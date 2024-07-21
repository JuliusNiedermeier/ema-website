import { groq } from "next-sanity";
import { FC } from "react";
import { EconomyXSocialHero } from "~/app/_components/compounds/economy-x-social-hero";
import { sanity } from "~/sanity/lib/client";
import { EconomySocialPageQueryResult } from "../../../../../../../generated/sanity/types";

const economySocialPageQuery = groq`*[_type == "economy-social-page"][0]`;

const EconomyXSocialPage: FC = async () => {
  const data = await sanity.fetch<EconomySocialPageQueryResult>(
    economySocialPageQuery,
    {},
    { next: { tags: ["economy-social-page"] } },
  );

  return (
    <EconomyXSocialHero
        headingUpper={data?.headingUpper || ""}
        headingLower={data?.headingLower || ""}
        description={data?.previewText || ""}
      />
  );
};

export default EconomyXSocialPage;
