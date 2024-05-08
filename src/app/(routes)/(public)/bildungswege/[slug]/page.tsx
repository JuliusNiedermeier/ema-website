import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading } from "~/app/_components/primitives/typography";
import {
  EducationalOfferQueryResult,
  EducationalOfferSlugsQueryResult,
} from "../../../../../../generated/sanity/types";
import { sanity } from "~/sanity/lib/client";
import { notFound } from "next/navigation";

const educationalOfferSlugsQuery = groq`*[_type == "education"]{ slug }`;

const educationalOfferQuery = groq`*[_type == "education" && slug.current == $slug][0]{
  ...
}`;

export const generateStaticParams = async () => {
  const offers = await sanity.fetch<EducationalOfferSlugsQueryResult>(
    educationalOfferSlugsQuery,
    {},
    { next: { tags: ["education"] } },
  );
  return offers.map((offer) => ({ slug: offer.slug?.current || null })).filter((params) => params.slug) as {
    slug: string;
  }[];
};

const EducationalOffersPage: FC<{ params: { slug: string } }> = async ({ params: { slug } }) => {
  const offer = await sanity.fetch<EducationalOfferQueryResult>(
    educationalOfferQuery,
    { slug: decodeURIComponent(slug) },
    { next: { tags: ["education"] } },
  );

  if (!offer) notFound();

  return (
    <Container className="mt-32">
      <Heading>{offer?.title}</Heading>
    </Container>
  );
};

export default EducationalOffersPage;
