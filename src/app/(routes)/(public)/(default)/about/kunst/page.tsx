import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { ArtPageQueryResult, ArtPageMetaQueryResult } from "../../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { EndOfPageCTA } from "~/app/_components/compounds/end-of-page-cta";
import { ParalaxGallery } from "~/app/_components/compounds/paralax-gallery";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const artPageQuery = groq`*[_type == "art-page"][0]{
  heading,
  teaser,
  artSubjects[] {
    title,
    slogan,
    description,
    image { alt, asset -> { url } }
  },
  educationalProgramTypesCTA
}`;

const artPageMetaQuery = groq`*[_type == "art-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<ArtPageMetaQueryResult>(artPageMetaQuery, {
  tags: ["art-page"],
});

const ArtPage: FC = async () => {
  const data = await sanityFetch<ArtPageQueryResult>(artPageQuery, { tags: ["art-page"] });

  if (!data) notFound();

  const galleryItems: ComponentProps<typeof ParalaxGallery>["items"] =
    data?.artSubjects?.map((subject) => ({
      image: { url: subject.image?.asset?.url || "", alt: subject.image?.alt || "" },
      heading: subject.title || "",
      subheading: subject.slogan || "",
      description: subject.description || "",
    })) || [];

  return (
    <>
      <div className="bg-neutral-200 pt-header">
        <Container width="narrow" className="py-32 text-center">
          <Heading>{data.heading}</Heading>
          <Paragraph>{data.teaser}</Paragraph>
        </Container>
      </div>

      <ParalaxGallery items={galleryItems} className="" />

      <Container width="narrow" className="mb-8 mt-24 md:mb-24 md:mt-48">
        <EndOfPageCTA
          heading={data.educationalProgramTypesCTA?.heading || ""}
          description={data.educationalProgramTypesCTA?.description || ""}
        >
          <EducationalProgramTypeCards />
        </EndOfPageCTA>
      </Container>
    </>
  );
};

export default ArtPage;
