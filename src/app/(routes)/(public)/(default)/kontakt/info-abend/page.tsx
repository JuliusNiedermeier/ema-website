import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanityFetch } from "~/sanity/lib/client";
import { InfoEventPageQueryResult } from "../../../../../../../generated/sanity/types";

const infoEventPageQuery = groq`*[_type == "info-event-page"][0]`;

const ContactPage: FC = async () => {
  const infoEventPageData = await sanityFetch<InfoEventPageQueryResult>(infoEventPageQuery, {
    tags: ["info-event-page"],
  });

  if (!infoEventPageData) notFound();

  return (
    <>
      <div className="relative">
        <div className="absolute left-0 top-0 -z-10 h-screen w-full bg-gradient-to-b from-neutral-200 to-neutral-100" />
        <Container className="z-10">
          <div className="mx-auto max-w-[35rem] text-balance py-28 text-center">
            <Heading>{infoEventPageData.heading}</Heading>
            <Paragraph>{infoEventPageData.description}</Paragraph>
          </div>
        </Container>
      </div>
    </>
  );
};

export default ContactPage;
