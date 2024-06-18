import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { GoPageEducationalProgramsQueryResult } from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { ApplicationFormCarousel } from "~/app/_components/compounds/application-form/application-form-carousel";
import { ApplicationFormNavigation } from "~/app/_components/compounds/application-form/application-form-navigation";
import { ApplicationFormProvider } from "~/app/_components/compounds/application-form/application-form-provider";
import { ApplicationFormProgress } from "~/app/_components/compounds/application-form/application-form-progress";
import { GoLayoutFooter, GoLayoutHeader } from "./_layout-components";
import { cookies } from "next/headers";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { redirect } from "next/navigation";
import { ensureValidHSL } from "~/app/_utils/color-swatch";

const goPageEducationalProgramsQuery = groq`*[_type == "educational-program"]{
  ...,
  educationalProgramType->
}`;

const GoPage: FC = async () => {
  if (cookies().has(applicationCookieName)) redirect("/go/verify");

  const programs = await sanity.fetch<GoPageEducationalProgramsQueryResult>(
    goPageEducationalProgramsQuery,
    {},
    { next: { tags: ["educational-program", "educational-program-type"] } },
  );

  const formattedPrograms = programs
    .filter((program) => program.educationalProgramType)
    .map<ComponentProps<typeof ApplicationFormProvider>["programs"][number]>((program) => ({
      ID: program._id,
      name: program.name || "Untitled",
      programType: {
        ID: program.educationalProgramType!._id,
        name: program.educationalProgramType!.name || "Untitled",
      },
      hslColor: ensureValidHSL(program.educationalProgramType?.color?.hsl),
    }));

  return (
    <ApplicationFormProvider programs={formattedPrograms}>
      <div className="flex h-full flex-col">
        <GoLayoutHeader />

        <Container width="narrow" className="flex flex-1 gap-16">
          <ApplicationFormProgress className="sticky top-36 hidden h-min md:flex" />
          <ApplicationFormCarousel className="mt-16 flex-1" />
        </Container>

        <GoLayoutFooter className="mt-4">
          <ApplicationFormNavigation verifyPath="/go/verify" />
        </GoLayoutFooter>
      </div>
    </ApplicationFormProvider>
  );
};

export default GoPage;
