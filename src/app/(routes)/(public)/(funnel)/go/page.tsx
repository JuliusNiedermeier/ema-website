import { groq } from "next-sanity";
import { ComponentProps, FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Label } from "~/app/_components/primitives/typography";
import { GoPageQueryResult, ProgramsQueryResult } from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import Link from "next/link";
import { ApplicationFormCarousel } from "~/app/_components/compounds/application-form/application-form-carousel";
import { ApplicationFormNavigation } from "~/app/_components/compounds/application-form/application-form-navigation";
import { ApplicationFormProvider } from "~/app/_components/compounds/application-form/application-form-provider";
import { ApplicationFormProgress } from "~/app/_components/compounds/application-form/application-form-progress";

const goPageQuery = groq`*[_type == "home-page"][0]{
  ...,
  video{asset->{url}},
}`;

const programsQuery = groq`*[_type == "education"] | order(order asc){
  ...,
  educationPath->
}`;

const GoPage: FC = async () => {
  const goPage = await sanity.fetch<GoPageQueryResult>(goPageQuery, {}, { next: { tags: ["go-page"] } });
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
      <div className="h-[100svh] overflow-hidden bg-neutral-200 lg:grid lg:grid-cols-[1fr_2fr]">
        <div className="sticky top-0 hidden h-full lg:block">
          <video
            playsInline
            autoPlay
            muted
            loop
            src={goPage?.video?.asset?.url || ""}
            className="h-full w-full bg-primary-900 object-cover"
          />
        </div>

        <div className="flex h-full flex-col overflow-y-auto overflow-x-hidden lg:z-10 lg:-ml-8 lg:rounded-l-3xl lg:bg-neutral-200">
          <div className="sticky top-0 z-20 border-b border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg">
            <Container width="narrow" className="flex items-center justify-between gap-2 py-4 lg:py-4">
              <Link href="/" className="rounded-full bg-neutral-200/60 px-4 py-2 backdrop-blur-lg">
                <SiteLogo show="text" />
              </Link>
              <Label>Online-Anmeldung</Label>
            </Container>
          </div>

          <Container width="narrow" className="flex flex-1 gap-16">
            <ApplicationFormProgress className="sticky top-36 hidden h-min md:block" />
            <ApplicationFormCarousel className="mt-16 flex-1" />
          </Container>

          <div className="sticky bottom-0 z-20 mt-4 border-t border-[gray]/50 bg-neutral-200/50 backdrop-blur-lg">
            <Container width="narrow" className="relative py-4">
              <ApplicationFormNavigation className="sticky bottom-4" />
              <div className="mt-4 flex items-center justify-center gap-4 opacity-50">
                <Label>Datenschutz</Label>
                <Label>Impressum</Label>
                <Label>AGBs</Label>
              </div>
            </Container>
          </div>
        </div>
      </div>
    </ApplicationFormProvider>
  );
};

export default GoPage;
