import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { CheckupForm } from "~/app/_components/compounds/checkup-form";
import { sanity } from "~/sanity/lib/client";
import { groq } from "next-sanity";
import {
  CheckupPageEducationalProgramsQueryResult,
  CheckupPageQueryResult,
} from "../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import {
  CheckupFormBottomModal,
  CheckupFormBottomModalRoot,
  CheckupFormBottomModalTrigger,
} from "~/app/_components/compounds/checkup-form-bottom-modal";
import { CheckupResults } from "~/app/_components/compounds/checkup-results";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { CheckupFormProvider } from "~/app/_components/compounds/checkup-form-provider";

const checkupPageQuery = groq`*[_type == "checkup-page"][0]`;

const checkupPageEducationalProgramsQuery = groq`*[_type == "educational-program"]{
  _id,
  slug,
  name,
  promotionalHeadline,
  educationalProgramType -> {
    name,
    color,
    slug
  }
}`;

const CheckupPage: FC = async () => {
  const data = await sanity.fetch<CheckupPageQueryResult>(checkupPageQuery, {}, { next: { tags: ["checkup-page"] } });

  const educationalPrograms = await sanity.fetch<CheckupPageEducationalProgramsQueryResult>(
    checkupPageEducationalProgramsQuery,
    {},
    { next: { tags: ["educational-program"] } },
  );

  if (!data) notFound();

  const questions: ComponentProps<typeof CheckupFormProvider>["questions"] =
    data.form?.questions?.map((question) => ({
      question: question.questionText || "",
      layout: question.arrangeHorizontal ? "horizontal" : "vertical",
      answers:
        question.answers?.map((answer) => ({
          answer: answer.answerText || "",
          ratings: JSON.parse(answer.answerRatings || "{}"),
        })) || [],
    })) || [];

  const formattedEducationalPrograms: ComponentProps<typeof CheckupResults>["educationalPrograms"] =
    educationalPrograms?.map((program) => ({
      ID: program._id,
      slug: program.slug?.current || "",
      name: program.name || "",
      slogan: program.promotionalHeadline || "",
      programType: {
        name: program.educationalProgramType?.name || "",
        slug: program.educationalProgramType?.slug?.current || "",
      },
      color: ensureValidHSL(program.educationalProgramType?.color?.hsl),
    })) || [];

  return (
    <CheckupFormBottomModalRoot>
      <CheckupFormProvider questions={questions}>
        <div className="bg-neutral-200">
          <Container>
            <div className="flex min-h-[80vh] gap-12">
              <div className="hidden flex-1 overflow-x-hidden border-r border-neutral-400 pr-8 pt-12 lg:block">
                <Heading>{data.form?.heading}</Heading>
                <CheckupForm className="mt-12 w-full" />
              </div>
              <div className="flex-[2] pt-12">
                <Heading>Das passt zu dir</Heading>
                <Paragraph>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias quibusdam animi dolores
                  blanditiis, recusandae odit corrupti excepturi dicta assumenda quia omnis, officia, sunt voluptas ad
                  quam soluta officiis at cupiditate.
                </Paragraph>
                <CheckupResults educationalPrograms={formattedEducationalPrograms} className="mt-12" />
              </div>
            </div>
            <CheckupFormBottomModalTrigger asChild className="sticky bottom-8 w-full justify-center lg:hidden">
              <Button>Open Drawer</Button>
            </CheckupFormBottomModalTrigger>
          </Container>
        </div>
        <CheckupFormBottomModal />
      </CheckupFormProvider>
    </CheckupFormBottomModalRoot>
  );
};

export default CheckupPage;
