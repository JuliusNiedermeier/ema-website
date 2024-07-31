import { groq } from "next-sanity";
import Image from "next/image";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { ArtPageQueryResult } from "../../../../../../../generated/sanity/types";
import { notFound } from "next/navigation";
import { EducationalProgramTypeCards } from "~/app/_components/blocks/educational-program-type-cards";
import { ChevronDownIcon } from "lucide-react";

const artPageQuery = groq`*[_type == "art-page"][0]{
  ...,
  background { asset -> { url } },
  artSubjects[] {
    ...,
    image { asset -> { url } }
  }
}`;

const ArtPage: FC = async () => {
  const data = await sanity.fetch<ArtPageQueryResult>(artPageQuery, {}, { next: { tags: ["art-page"] } });

  if (!data) notFound();

  return (
    <>
      <div className="absolute left-0 top-0 -z-10 h-[300vh] w-full bg-neutral-100">
        <div className="relative h-full">
          <Image
            src={data.background?.asset?.url || ""}
            width="1920"
            height="1080"
            alt={data.heading || ""}
            className="h-screen overflow-hidden object-cover"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-neutral-200/80 backdrop-blur-3xl"></div>
          <div className="absolute left-0 top-[200vh] h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100"></div>
        </div>
      </div>
      <Container width="narrow" className="pt-32 text-center">
        <Heading>{data.heading}</Heading>
        <Paragraph>{data.preview?.excerpt}</Paragraph>
      </Container>
      <Container className="mt-32 [&>*+*]:mt-12">
        {data.artSubjects?.map((subject, index) => (
          <div
            key={index}
            className="flex flex-col rounded-3xl border border-neutral-400 bg-neutral-100 p-4 md:flex-row md:items-start md:gap-12"
          >
            <div className="top-24 py-4 md:sticky md:flex-1 md:px-4">
              <Heading size="sm" className="m-0">
                {subject.title}
              </Heading>
              <Paragraph className="mt-1">{subject.slogan}</Paragraph>
            </div>
            <div className="ml-auto max-w-[60rem] md:flex-[2]">
              <Image
                src={subject.image?.asset?.url || ""}
                alt={subject.title || ""}
                width="1920"
                height="1080"
                className="aspect-video w-full rounded-2xl object-cover"
              />
              <Paragraph className="max-w-[40rem]x mt-12">{subject.description}</Paragraph>
            </div>
          </div>
        ))}
      </Container>
      <Container className="mt-48">
        <div className="flex flex-col items-center">
          <div className="h-48 w-px bg-gradient-to-b from-transparent to-primary-900" />
          <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-900">
            <ChevronDownIcon className="text-primary-900-text" />
          </div>
        </div>
        <Container width="narrow" className="mt-24 text-center">
          <Heading>{data.educationalProgramTypesCTA?.heading}</Heading>
          <Paragraph>{data.educationalProgramTypesCTA?.description}</Paragraph>
        </Container>
        <EducationalProgramTypeCards className="mt-24" />
      </Container>
    </>
  );
};

export default ArtPage;
