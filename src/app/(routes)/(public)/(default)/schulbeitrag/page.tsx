import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { FeesPageProgramsQueryResult, FeesPageQueryResult } from "../../../../../../generated/sanity/types";
import { ProgramFeesChart } from "~/app/_components/compounds/program-fees-chart";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const feesPageQuery = groq`*[_type == "fees-page"][0] {
  ...
}`;

const feesPageProgramsQuery = groq`*[_type == "educational-program"] {
  _id,
  name,
  educationalProgramType -> {
    _id,
    name,
    color
  }
}`;

const FeesPage: FC = async () => {
  const pageData = await sanityFetch<FeesPageQueryResult>(feesPageQuery, { tags: ["fees-page"] });

  if (!pageData) notFound();

  const programs = await sanityFetch<FeesPageProgramsQueryResult>(feesPageProgramsQuery, {
    tags: ["educational-program", "educational-program-type"],
  });

  const programFees: ComponentProps<typeof ProgramFeesChart>["programFees"] = programs
    ?.filter((program) => program.educationalProgramType)
    .map((program) => ({
      program: {
        ID: program._id,
        title: program.name || "",
        type: { ID: program.educationalProgramType!._id, title: program.educationalProgramType?.name || "" },
        color: ensureValidHSL(program.educationalProgramType?.color?.hsl),
      },
      fees: [
        { incomeRangeLabel: "unter 19k €", fee: 75 },
        { incomeRangeLabel: "19k bis 22k €", fee: 80 },
        { incomeRangeLabel: "22k bis 24k €", fee: 90 },
        { incomeRangeLabel: "24k bis 26k €", fee: 100 },
        { incomeRangeLabel: "26k bis 28k €", fee: 115 },
        { incomeRangeLabel: "28k bis 32k €", fee: 125 },
        { incomeRangeLabel: "32k bis 35k €", fee: 130 },
        { incomeRangeLabel: "35k bis 38k €", fee: 135 },
        { incomeRangeLabel: "38k bis 40k €", fee: 145 },
        { incomeRangeLabel: "40k bis 42k €", fee: 155 },
        { incomeRangeLabel: "42k bis 44k €", fee: 165 },
        { incomeRangeLabel: "44k bis 48k €", fee: 175 },
        { incomeRangeLabel: "48k bis 52k €", fee: 190 },
        { incomeRangeLabel: "52k bis 56k €", fee: 200 },
        { incomeRangeLabel: "über 56k €", fee: 220 },
      ],
    }));

  return (
    <Container width="narrow" className="my-32">
      <Heading>{pageData.heading}</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet aliquid consectetur, doloremque architecto
        aliquam quae. Minus, porro laudantium? Facere tempora perspiciatis minima impedit illo ducimus fugit totam
        distinctio atque expedita?
      </Paragraph>
      <ProgramFeesChart className="mt-12" programFees={programFees} />
    </Container>
  );
};

export default FeesPage;
