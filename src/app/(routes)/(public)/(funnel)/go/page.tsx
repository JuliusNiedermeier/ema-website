import { groq } from "next-sanity";
import { ComponentProps, FC, Suspense } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label } from "~/app/_components/primitives/typography";
import { GoPageQueryResult, ProgramsQueryResult } from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { SiteLogo } from "~/app/_components/compounds/site-logo";
import Link from "next/link";
import { ProgressProvider } from "~/app/_components/primitives/progress-provider";
import { ApplicationForm } from "~/app/_components/compounds/application-form/application-form";
import { Chip } from "~/app/_components/primitives/chip";

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
    .map<ComponentProps<typeof ApplicationForm>["programs"][number]>((program) => ({
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
    <div className="gap-4 bg-neutral-200 lg:grid lg:grid-cols-[1fr_2fr]">
      <div className="sticky top-0 hidden h-screen p-4 lg:block">
        <video
          playsInline
          autoPlay
          muted
          loop
          src={goPage?.video?.asset?.url || ""}
          className="h-full w-full rounded-2xl bg-primary-900 object-cover"
        />
      </div>
      <Container width="narrow" className="flex min-h-[100svh] flex-col py-2">
        <div className="sticky top-4 z-20 flex flex-col gap-2 items-center justify-between py-4 lg:flex-row lg:py-8">
          <Link href="/" className="rounded-full bg-neutral-200/60 px-4 py-2 backdrop-blur-lg">
            <SiteLogo />
          </Link>
          <Chip className="bg-neutral-400">
            <Label>Online-Anmeldung</Label>
          </Chip>
        </div>

        <ProgressProvider>
          <Suspense fallback="Loading...">
            <ApplicationForm className="flex-1" programs={formattedPrograms} />
          </Suspense>
        </ProgressProvider>

        <div className="mt-4 flex items-center justify-center gap-4 opacity-50">
          <Label>Datenschutz</Label>
          <Label>Impressum</Label>
          <Label>AGBs</Label>
        </div>
      </Container>
    </div>
  );
};

export default GoPage;
