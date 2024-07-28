import { groq } from "next-sanity";
import { FC } from "react";
import { TextPortableContent } from "~/app/_components/compounds/text-portable-content";
import { Container } from "~/app/_components/primitives/container";
import { sanity } from "~/sanity/lib/client";
import { PrivacyPageQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";

const privacyPageQuery = groq`*[_type == "privacy-page"][0]`;

const PrivacyPage: FC = async () => {
  const data = await sanity.fetch<PrivacyPageQueryResult>(privacyPageQuery, {}, { next: { tags: ["privacy-page"] } });

  if (!data) notFound();

  return (
    <Container width="narrow" className="my-32">
      <TextPortableContent content={data.content || []} />
    </Container>
  );
};

export default PrivacyPage;
