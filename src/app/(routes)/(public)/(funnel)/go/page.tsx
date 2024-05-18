import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { ProgramsQueryResult } from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { ApplicationFormCarousel } from "~/app/_components/compounds/application-form/application-form-carousel";
import { ApplicationFormNavigation } from "~/app/_components/compounds/application-form/application-form-navigation";
import { ApplicationFormProvider } from "~/app/_components/compounds/application-form/application-form-provider";
import { ApplicationFormProgress } from "~/app/_components/compounds/application-form/application-form-progress";
import { GoLayoutFooter, GoLayoutHeader } from "./_layout-components";
import { cookies } from "next/headers";
import { applicationCookieName } from "~/server/resources/application/application-cookie";
import { redirect } from "next/navigation";

const programsQuery = groq`*[_type == "education"] | order(order asc){
  ...,
  educationPath->
}`;

const GoPage: FC = async () => {
  if (cookies().has(applicationCookieName)) redirect("/go/verify");

  const programs = await sanity.fetch<ProgramsQueryResult>(programsQuery, {});

  const formattedPrograms = programs
    .filter((program) => program.educationPath)
    .map<ComponentProps<typeof ApplicationFormProvider>["programs"][number]>((program) => ({
      ID: program._id,
      name: program.title || "Untitled",
      programType: {
        ID: program.educationPath!._id,
        name: program.educationPath!.title || "Untitled",
      },
      variant: program.variant,
      colors: {
        primary: program.colors?.primary || "var(--neutral-300)",
        secondary: program.colors?.darker || "var(--neutral-400)",
      },
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
