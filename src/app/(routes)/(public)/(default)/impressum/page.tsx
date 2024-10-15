import { groq } from "next-sanity";
import { FC } from "react";
import { TextPortableContent } from "~/app/_components/compounds/text-portable-content";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { ImpressumPageQueryResult, ImpressumPageMetaQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const impressumPageQuery = groq`*[_type == "impressum-page"][0]`;

const impressumPageMetaQuery = groq`*[_type == "impressum-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<ImpressumPageMetaQueryResult>(impressumPageMetaQuery, {
  tags: ["impressum-page"],
});

const ImpressumPage: FC = async () => {
  const data = await sanityFetch<ImpressumPageQueryResult>(impressumPageQuery, { tags: ["impressum-page"] });

  if (!data) notFound();

  return (
    <Container width="narrow" className="my-32 pt-header">
      <TextPortableContent content={data.content || []} />
    </Container>
  );
};

export default ImpressumPage;
