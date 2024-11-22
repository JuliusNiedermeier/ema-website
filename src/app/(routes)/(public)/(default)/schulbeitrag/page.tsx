import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import {
  FeesPageProgramsQueryResult,
  FeesPageQueryResult,
  FeesPageMetaQueryResult,
} from "../../../../../../generated/sanity/types";
import { ProgramFeesChart } from "~/app/_components/compounds/program-fees-chart";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { Card } from "~/app/_components/primitives/card";
import { IconChip } from "~/app/_components/primitives/icon-chip";
import { PlusIcon } from "lucide-react";
import { createGenerateMetadata } from "~/app/_utils/create-generate-meta";

const feesPageQuery = groq`*[_type == "fees-page"][0] {
  ...,
  defaultProgram -> { _id },
  videoHeading,
  videoIntroduction,
  videoThumbnail { asset -> { url } },
  video { asset -> { url } }
}`;

const feesPageProgramsQuery = groq`*[_type == "educational-program"] | order(order asc) {
  _id,
  name,
  fees,
  educationalProgramType -> {
    _id,
    name,
    color
  },
}`;

const feesPageMetaQuery = groq`*[_type == "fees-page"][0]{
  "title": coalesce(seo.title, ""),
  "description": coalesce(seo.description, ""),
}`;

export const generateMetadata = createGenerateMetadata<FeesPageMetaQueryResult>(feesPageMetaQuery, {
  tags: ["fees-page"],
});

const FeesPage: FC = async () => {
  const pageData = await sanityFetch<FeesPageQueryResult>(feesPageQuery, {
    tags: ["fees-page", "educational-program"],
  });

  if (!pageData) notFound();

  const programs = await sanityFetch<FeesPageProgramsQueryResult>(feesPageProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  type FeeGroups = ComponentProps<typeof ProgramFeesChart>["programFees"][0]["feeGroups"];

  const programFees: ComponentProps<typeof ProgramFeesChart>["programFees"] =
    programs
      ?.filter((program) => program.educationalProgramType)
      .map((program) => {
        const feeCoverageRateIndex = program.fees?.findIndex((fee) => fee.isCoverageRate);

        const fees: FeeGroups[0]["fees"] =
          program.fees?.map((fee) => ({
            incomeRangeLabel: fee.income || "-",
            fee: fee.fee || 0,
            isCoverageRate: fee.isCoverageRate || false,
          })) || [];

        return {
          program: {
            ID: program._id,
            title: program.name || "",
            type: { ID: program.educationalProgramType!._id, title: program.educationalProgramType?.name || "" },
            color: ensureValidHSL(program.educationalProgramType?.color?.hsl),
          },
          feeGroups:
            feeCoverageRateIndex !== undefined
              ? [
                  {
                    title: pageData.belowCoverageInfo?.heading || "",
                    description: pageData.belowCoverageInfo?.description,
                    fees: fees.slice(0, feeCoverageRateIndex),
                  },
                  {
                    title: pageData.coverageLabel || "",
                    fees: [fees[feeCoverageRateIndex]],
                    highlight: true,
                  },
                  {
                    title: pageData.aboveCoverageInfo?.heading || "",
                    description: pageData.aboveCoverageInfo?.description,
                    fees: fees.slice(feeCoverageRateIndex + 1),
                  },
                ]
              : [],
        };
      }) || [];

  return (
    <>
      <div className="bg-neutral-200 pt-header">
        <Container className="pb-4 pt-32">
          <Container width="narrow" className="text-center">
            <Heading tag="h1">{pageData.heading}</Heading>
            <Paragraph>{pageData.teaser}</Paragraph>
          </Container>
          <div className="mt-16 grid grid-cols-[repeat(auto-fit,minmax(15rem,1fr))] gap-2 sm:gap-4">
            {pageData.highlights?.map((highlight, index) => (
              <Card key={index} className="flex-1 border bg-primary-900 text-neutral-900-text">
                <IconChip className="bg-primary-100 text-primary-100-text">
                  <PlusIcon />
                </IconChip>
                <Paragraph className="mt-4">{highlight}</Paragraph>
              </Card>
            ))}
          </div>
        </Container>
      </div>
      <Container className="mt-24">
        <ProgramFeesChart
          className="mt-12"
          programSelectLabel={pageData.programSelectLabel || ""}
          programSelectPlaceholder={pageData.programSelectPlaceholder || ""}
          incomeLabel={pageData.incomeLabel || ""}
          feeLabel={pageData.feeLabel || ""}
          feeCurrency={pageData.feeCurrency || ""}
          defaultProgramID={pageData.defaultProgram?._id || null}
          programFees={programFees}
        />
      </Container>

      <Container width="narrow" className="mt-40 text-center">
        <Heading tag="h2">{pageData.videoHeading}</Heading>
        <Paragraph>{pageData.videoIntroduction}</Paragraph>
      </Container>

      <Container className="mt-16 overflow-hidden rounded-2xl border border-neutral-100-text-muted shadow">
        <video controls src={pageData.video?.asset?.url || ""} poster={pageData.videoThumbnail?.asset?.url || ""} />
      </Container>
    </>
  );
};

export default FeesPage;
