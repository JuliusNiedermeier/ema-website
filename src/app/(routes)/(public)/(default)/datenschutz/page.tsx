import { groq } from "next-sanity";
import { FC } from "react";
import { TextPortableContent } from "~/app/_components/compounds/text-portable-content";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { PrivacyPageQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";

const privacyPageQuery = groq`*[_type == "privacy-page"][0]`;

const PrivacyPage: FC = async () => {
  const data = await sanityFetch<PrivacyPageQueryResult>(privacyPageQuery, { tags: ["privacy-page"] });

  if (!data) notFound();

  return (
    <Container width="narrow" className="pt-header my-32">
      <TextPortableContent content={data.content || []} />
    </Container>
  );
};

export default PrivacyPage;
