import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import Image from "next/image";
import { ProgramSubjectMatrix } from "~/app/_components/blocks/program-subject-matrix";
import { ProgramLearningFieldsComparison } from "~/app/_components/blocks/program-learning-fields-comparison";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ComparisonPageQueryResult, ComparisonPageMetaQueryResult } from "../../../../../../generated/sanity/types";
import { Section } from "~/app/_components/primitives/section";
import { notFound } from "next/navigation";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";
import { SanityImage } from "~/app/_components/primitives/sanity-image";

const comparisonPageQuery = groq`*[_type == "comparison-page"][0]`;

const comparisonPageMetaQuery = groq`*[_type == "comparison-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<ComparisonPageMetaQueryResult>(comparisonPageMetaQuery, {
  tags: ["comparison-page"],
});

const ÜbersichtPage: FC = async () => {
  const comparisonPageData = await sanityFetch<ComparisonPageQueryResult>(comparisonPageQuery, {
    tags: ["comparison-page"],
  });

  if (!comparisonPageData) notFound();

  return (
    <>
      <div className="bg-neutral-200 pb-[4rem] pt-header">
        <Container width="narrow" className="py-32 text-center">
          <Heading tag="h1" size="sm" className="text-neutral-100-text-muted">
            {comparisonPageData.heading}
          </Heading>
          <Heading tag="h2" className="mt-12">
            {comparisonPageData.pathsSection?.heading}
          </Heading>
          <Paragraph>{comparisonPageData.pathsSection?.description}</Paragraph>
        </Container>
      </div>

      <Section className="overflow-hidden bg-primary-900">
        {/* <InteractiveProgramFlow /> */}
        <Container className="py-8">
          <SanityImage image={comparisonPageData.pathsSection?.image} width="2000" height="2000" />
        </Container>
      </Section>

      <Section className="bg-neutral-400 py-24 sm:pt-36 lg:pt-64">
        <Container width="narrow" className="text-center">
          <Heading tag="h2">{comparisonPageData.subjectsSection?.heading}</Heading>
          <Paragraph>{comparisonPageData.subjectsSection?.description}</Paragraph>
        </Container>

        <Container className="mt-16 md:mt-32">
          <ProgramSubjectMatrix />
        </Container>
      </Section>

      <Section connect="top" className="bg-neutral-100 pb-8 pt-24 sm:pt-36 lg:pt-64">
        <Container width="narrow" className="text-center">
          <Heading tag="h2">{comparisonPageData.learningFieldsSection?.heading}</Heading>
          <Paragraph>{comparisonPageData.learningFieldsSection?.description}</Paragraph>
        </Container>

        <Container className="mt-16 md:mt-32">
          <ProgramLearningFieldsComparison />
        </Container>
      </Section>
    </>
  );
};

export default ÜbersichtPage;
