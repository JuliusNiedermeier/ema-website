import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import Image from "next/image";
import { ProgramSubjectMatrix } from "~/app/_components/blocks/program-subject-matrix";
import { ProgramLearningFieldsComparison } from "~/app/_components/blocks/program-learning-fields-comparison";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { ComparisonPageQueryResult } from "../../../../../../generated/sanity/types";

const comparisonPageQuery = groq`*[_type == "comparison-page"][0]`;

const ÜbersichtPage: FC = async () => {
  const comparisonPageData = await sanityFetch<ComparisonPageQueryResult>(comparisonPageQuery, {
    tags: ["comparison-page"],
  });

  return (
    <div className="bg-neutral-200 py-32">
      <Container width="narrow" className="mt-header text-center">
        <Heading>{comparisonPageData?.pathsSection?.heading}</Heading>
        <Paragraph>{comparisonPageData?.pathsSection?.heading}</Paragraph>
      </Container>

      <Container className="mt-24 overflow-hidden rounded-3xl border border-neutral-400">
        <Image src="/overview.svg" width="2000" height="2000" alt="overview" />
      </Container>

      <Container width="narrow" className="mt-64 text-center">
        <Heading>{comparisonPageData?.subjectsSection?.heading}</Heading>
        <Paragraph>{comparisonPageData?.subjectsSection?.heading}</Paragraph>
      </Container>

      <Container className="mt-24">
        <ProgramSubjectMatrix />
      </Container>

      <Container width="narrow" className="mt-64 text-center">
        <Heading>{comparisonPageData?.learningFieldsSection?.heading}</Heading>
        <Paragraph>{comparisonPageData?.learningFieldsSection?.heading}</Paragraph>
      </Container>

      <Container className="mt-24">
        <ProgramLearningFieldsComparison />
      </Container>
    </div>
  );
};

export default ÜbersichtPage;
