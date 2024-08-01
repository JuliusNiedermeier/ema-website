import { groq } from "next-sanity";
import { FC } from "react";
import { TextPortableContent } from "~/app/_components/compounds/text-portable-content";
import { Container } from "~/app/_components/primitives/container";
import { sanityFetch } from "~/sanity/lib/client";
import { ImpressumPageQueryResult } from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";

const impressumPageQuery = groq`*[_type == "impressum-page"][0]`;

const ImpressumPage: FC = async () => {
  const data = await sanityFetch<ImpressumPageQueryResult>(impressumPageQuery, { tags: ["impressum-page"] });

  if (!data) notFound();

  return (
    <Container width="narrow" className="my-32">
      <TextPortableContent content={data.content || []} />
    </Container>
  );
};

export default ImpressumPage;
