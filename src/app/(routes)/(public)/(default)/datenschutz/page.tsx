import { groq } from "next-sanity";
import { FC } from "react";
import { TextPortableContent } from "~/app/_components/compounds/text-portable-content";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { PrivacyPageQueryResult, PrivacyPageMetaQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const privacyPageQuery = groq`*[_type == "privacy-page"][0]`;

const privacyPageMetaQuery = groq`*[_type == "privacy-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<PrivacyPageMetaQueryResult>(privacyPageMetaQuery, {
  tags: ["privacy-page"],
});

const PrivacyPage: FC = async () => {
  const data = await sanityFetch<PrivacyPageQueryResult>(privacyPageQuery, { tags: ["privacy-page"] });

  if (!data) notFound();

  return (
    <Container width="narrow" className="my-32 pt-header">
      <TextPortableContent content={data.content || []} />
    </Container>
  );
};

export default PrivacyPage;
