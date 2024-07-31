import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import {
  ApplicationPageFormQueryResult,
  GoPageEducationalProgramsQueryResult,
} from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { ApplicationFormCarousel } from "~/app/_components/compounds/application-form/application-form-carousel";
import { ApplicationFormNavigation } from "~/app/_components/compounds/application-form/application-form-navigation";
import { ApplicationFormProvider } from "~/app/_components/compounds/application-form/application-form-provider";
import { ApplicationFormProgress } from "~/app/_components/compounds/application-form/application-form-progress";
import { GoLayoutFooter, GoLayoutHeader } from "./_layout-components";
import { cookies } from "next/headers";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { notFound, redirect } from "next/navigation";
import { ensureValidHSL } from "~/app/_utils/color-swatch";
import { ProgramsStepProps } from "~/app/_components/compounds/application-form/steps/programs";

const applicationPageFormQuery = groq`*[_type == "application-page"][0]{
  title,
  steps,
  navigation
}`;

const goPageEducationalProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  educationalProgramType->
}`;

const GoPage: FC = async () => {
  if (cookies().has(applicationCookieName)) redirect("/go/verify");

  const data = await sanity.fetch<ApplicationPageFormQueryResult>(
    applicationPageFormQuery,
    {},
    { next: { tags: ["application-page"] } },
  );

  if (!data) notFound();

  const programs = await sanity.fetch<GoPageEducationalProgramsQueryResult>(
    goPageEducationalProgramsQuery,
    {},
    { next: { tags: ["educational-program", "educational-program-type"] } },
  );

  const formattedPrograms = programs
    .filter((program) => program.educationalProgramType)
    .map<ProgramsStepProps["programs"][number]>((program) => ({
      ID: program._id,
      name: program.name || "Untitled",
      programType: {
        ID: program.educationalProgramType!._id,
        name: program.educationalProgramType!.name || "Untitled",
      },
      hslColor: ensureValidHSL(program.educationalProgramType?.color?.hsl),
    }));

  return (
    <ApplicationFormProvider
      stepData={{
        program: { heading: data.steps?.program?.heading || "", programs: formattedPrograms },
        applicant: {
          heading: data.steps?.applicant?.heading || "",
          description: data.steps?.applicant?.description || "",
          inputs: {
            name: {
              label: data.steps?.applicant?.nameInputLabel || "",
              placeholder: data.steps?.applicant?.nameInputPlaceholder || "",
            },
            age: {
              label: data.steps?.applicant?.ageInputLabel || "",
              placeholder: data.steps?.applicant?.ageInputPlaceholder || "",
            },
            motivation: {
              label: data.steps?.applicant?.motivationInputLabel || "",
              description: data.steps?.applicant?.motivationInputDescription || "",
              placeholder: data.steps?.applicant?.motivationInputPlaceholder || "",
            },
          },
        },
        verification: {
          heading: data.steps?.verification?.heading || "",
          description: data.steps?.verification?.description || "",
          emailInput: {
            label: data.steps?.verification?.emailInputLabel || "",
            placeholder: data.steps?.verification?.emailInputPlaceholder || "",
          },
        },
      }}
      stepTitles={{
        program: data.steps?.program?.title || "",
        applicant: data.steps?.applicant?.title || "",
        verification: data.steps?.verification?.title || "",
      }}
    >
      <div className="flex h-full flex-col">
        <GoLayoutHeader title={data.title || ""} />

        <Container width="narrow" className="flex flex-1 gap-16">
          <ApplicationFormProgress
            className="sticky top-36 hidden h-min md:flex"
            statusLabels={{
              pending: data.navigation?.pendingLabel || "",
              complete: data.navigation?.completeLabel || "",
            }}
          />
          <ApplicationFormCarousel className="mt-16 flex-1" />
        </Container>

        <GoLayoutFooter className="mt-4">
          <ApplicationFormNavigation
            verifyPath="/go/verify"
            buttonLabels={{
              back: data.navigation?.backLabel || "",
              next: data.navigation?.nextLabel || "",
              submit: data.navigation?.submitLabel || "",
            }}
          />
        </GoLayoutFooter>
      </div>
    </ApplicationFormProvider>
  );
};

export default GoPage;
