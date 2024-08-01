import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { Button } from "~/app/_components/primitives/button";
import { CheckupForm } from "~/app/_components/compounds/checkup-form/checkup-form";
import { sanityFetch } from "~/sanity/lib/client";
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
} from "~/app/_components/compounds/checkup-form/checkup-form-bottom-modal";
import { CheckupResults } from "~/app/_components/compounds/checkup-form/checkup-results";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { CheckupFormProvider } from "~/app/_components/compounds/checkup-form/checkup-form-provider";
import { ResultCounter } from "~/app/_components/compounds/checkup-form/result-counter";

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
  const data = await sanityFetch<CheckupPageQueryResult>(checkupPageQuery, { tags: ["checkup-page"] });

  const educationalPrograms = await sanityFetch<CheckupPageEducationalProgramsQueryResult>(
    checkupPageEducationalProgramsQuery,
    { tags: ["educational-program"] },
  );

  if (!data) notFound();

  const questions: ComponentProps<typeof CheckupFormProvider>["questions"] =
    data.form?.questions?.map((question) => ({
      ID: question._key,
      question: question.questionText || "",
      layout: question.arrangeHorizontal ? "horizontal" : "vertical",
      allowMutlipleAnswers: Boolean(question.allowMultipleAnswers),
      answers:
        question.answers?.map((answer) => ({
          ID: answer._key,
          answer: answer.answerText || "",
          isExclusionCriterion: Boolean(answer.isExclusionCriterion),
          ratings: JSON.parse((answer.isExclusionCriterion ? answer.booleanRatings : answer.numberRatings) || "{}"),
        })) || [],
    })) || [];

  const formattedEducationalPrograms: ComponentProps<typeof CheckupFormProvider>["programs"] =
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
      <CheckupFormProvider questions={questions} programs={formattedEducationalPrograms}>
        <div className="rounded-b-3xl bg-neutral-200 py-8">
          <Container>
            <div className="flex items-stretch gap-12">
              <div className="hidden flex-1 overflow-x-hidden rounded-3xl border border-neutral-400 bg-neutral-100 p-8 lg:block">
                <Heading size="sm">{data.form?.heading}</Heading>
                <CheckupForm className="w-full" />
              </div>
              <div className="relative flex-[2]">
                <div>
                  <Heading size="sm" className="text-neutral-200-text-muted">
                    {data.heading}
                  </Heading>
                  <Heading className="text-neutral-200-text">{data.previewText}</Heading>
                  <Paragraph>{data.description}</Paragraph>
                </div>
                <CheckupResults
                  className="mt-12"
                  placeholder={{
                    heading: data.placeholder?.heading || "",
                    description: data.placeholder?.description || "",
                    contactLinkLabel: data.placeholder?.contactLinkLabel || "",
                  }}
                />
                <div className="pointer-events-none absolute left-0 top-0 h-full w-full">
                  <ResultCounter
                    singularSuffix={data.resultCounter?.suffixSingular || ""}
                    pluralSuffix={data.resultCounter?.suffixPlural || ""}
                    className="pointer-events-auto sticky top-20 z-10 ml-auto mr-2 mt-2 block"
                  />
                </div>
              </div>
            </div>
            <CheckupFormBottomModalTrigger asChild className="sticky bottom-8 mt-8 w-full justify-center lg:hidden">
              <Button vairant="outline" className="w-full bg-neutral-100">
                <Label>{data.bottomSheetModalTriggerLabel}</Label>
              </Button>
            </CheckupFormBottomModalTrigger>
          </Container>
        </div>
        <CheckupFormBottomModal
          heading={data.bottomSheetModalTriggerLabel || ""}
          resultCounter={{
            singularSuffix: data.resultCounter?.suffixSingular || "",
            pluralSuffix: data.resultCounter?.suffixPlural || "",
          }}
        />
      </CheckupFormProvider>
    </CheckupFormBottomModalRoot>
  );
};

export default CheckupPage;
