import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import Image from "next/image";
import { ProgramSubjectMatrix } from "~/app/_components/blocks/program-subject-matrix";
import { ProgramLearningFieldsComparison } from "~/app/_components/blocks/program-learning-fields-comparison";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ComparisonPageQueryResult } from "../../../../../../generated/sanity/types";
import { Section } from "~/app/_components/primitives/section";

const comparisonPageQuery = groq`*[_type == "comparison-page"][0]`;

const ÜbersichtPage: FC = async () => {
  const comparisonPageData = await sanityFetch<ComparisonPageQueryResult>(comparisonPageQuery, {
    tags: ["comparison-page"],
  });

  return (
    <>
      <div className="bg-neutral-200 pb-[4rem] pt-header">
        <Container width="narrow" className="py-24 text-center">
          <Heading>{comparisonPageData?.pathsSection?.heading}</Heading>
          <Paragraph>{comparisonPageData?.pathsSection?.heading}</Paragraph>
        </Container>
      </div>

      <Section className="overflow-hidden bg-primary-900">
        {/* <InteractiveProgramFlow /> */}
        <Container className="py-8">
          <Image src="/overview.svg" width="2000" height="2000" alt="overview" />
        </Container>
      </Section>

      <Section className="bg-neutral-400 py-24 sm:pt-36 lg:pt-64">
        <Container width="narrow" className="text-center">
          <Heading>{comparisonPageData?.subjectsSection?.heading}</Heading>
          <Paragraph>{comparisonPageData?.subjectsSection?.heading}</Paragraph>
        </Container>

        <Container className="mt-16 md:mt-24">
          <ProgramSubjectMatrix />
        </Container>
      </Section>

      <Section connect="top" className="bg-neutral-100 pb-8 pt-24 sm:pt-36 lg:pt-64">
        <Container width="narrow" className="text-center">
          <Heading>{comparisonPageData?.learningFieldsSection?.heading}</Heading>
          <Paragraph>{comparisonPageData?.learningFieldsSection?.heading}</Paragraph>
        </Container>

        <Container className="mt-16 md:mt-24">
          <ProgramLearningFieldsComparison />
        </Container>
      </Section>
    </>
  );
};

export default ÜbersichtPage;
