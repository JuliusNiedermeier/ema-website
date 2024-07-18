import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import Image from "next/image";
import { ParalaxContainer } from "~/app/_components/compounds/paralax-image";
import { CampusInfoCard, CampusInfoCardListProvider } from "~/app/_components/compounds/campus-info-card";

const campusPageQuery = groq`*[_type == "campus-page"][0]{
  ...,
  heroImage { asset -> { url } },
  images[]{
    _type == "image-item" => {
      ...,
      asset -> { url }
    },
  }
}`;

const CampusPage: FC = async () => {
  const data = await sanity.fetch<CampusPageQueryResult>(campusPageQuery, {}, { next: { tags: ["campus-page"] } });

  return (
    <div className="rounded-b-3xl bg-neutral-200">
      <Container className="py-16">
        <Heading>{data?.heading}</Heading>
        <Paragraph className="max-w-[40rem]">{data?.previewText}</Paragraph>
      </Container>
      <div className="flex flex-col gap-4">
        <CampusInfoCardListProvider>
          {data?.images?.map((image, index, images) => (
            <div key={index} className="relative h-[75vh]">
              <div className="absolute left-0 top-0 h-full w-full">
                <Container width="wide" className="h-full overflow-hidden rounded-3xl">
                  <ParalaxContainer className="h-full w-full">
                    <Image
                      src={image.asset?.url || ""}
                      alt={"TODO"}
                      width="1920"
                      height="1080"
                      className="h-full w-full overflow-hidden object-cover"
                    />
                  </ParalaxContainer>
                </Container>
              </div>
              <div className="absolute bottom-0 left-0 w-full">
                <Container className="py-[6px] md:py-8">
                  <CampusInfoCard title={`Teammitglied ${index + 1}`} subtitle="Sportlehrer">
                    <Paragraph>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt expedita laborum, soluta eum
                      aliquid enim, cum facilis sunt minus facere voluptatum iure nostrum fugit aliquam blanditiis
                      veritatis porro sint sapiente.
                    </Paragraph>
                  </CampusInfoCard>
                </Container>
              </div>
            </div>
          ))}
        </CampusInfoCardListProvider>
      </div>
    </div>
  );
};

export default CampusPage;
