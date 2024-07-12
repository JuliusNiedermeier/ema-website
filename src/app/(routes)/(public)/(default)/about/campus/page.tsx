import { groq } from "next-sanity";
import { FC } from "react";
import { Container } from "~/app/_components/primitives/container";
import { Heading, Label, Paragraph } from "~/app/_components/primitives/typography";
import { sanity } from "~/sanity/lib/client";
import { CampusPageQueryResult } from "../../../../../../../generated/sanity/types";
import Image from "next/image";
import { cn } from "~/app/_utils/cn";
import { Card } from "~/app/_components/primitives/card";
import { ArrowUpRightIcon, ChevronsDownIcon, Maximize2Icon, PlusIcon } from "lucide-react";
import { ParalaxContainer } from "~/app/_components/compounds/paralax-image";

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
      <div className="relative flex flex-col gap-4">
        {data?.images?.map((image, index, images) => (
          <div key={index} className="relative h-screen">
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
            <div className="absolute left-0 top-0 flex h-full w-full items-end">
              <Container className="sticky bottom-24 py-[6px] md:bottom-0 md:py-8">
                <Card className="group flex w-fit cursor-pointer items-center gap-4 rounded-[1.3rem] p-4 pl-8 transition-[border-radius] duration-300 hover:rounded-2xl md:rounded-[4rem]">
                  <div>
                    <Heading size="sm" className="m-0">
                      Klassenzimmer
                    </Heading>
                    <Label className="text-neutral-100-text-muted">3 Bilder</Label>
                  </div>
                  <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary-900 text-primary-900-text">
                    <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
                      <ArrowUpRightIcon className="transition-all duration-300 group-hover:-translate-y-full group-hover:translate-x-full" />
                    </div>
                    <div className="absolute left-0 top-0 grid h-full w-full place-items-center">
                      <ArrowUpRightIcon className="-translate-x-full translate-y-full transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                  </div>
                </Card>
              </Container>
            </div>
          </div>
        ))}
        <div className="pointer-events-none absolute left-0 top-0 flex h-full w-full items-end">
          <Container className="sticky bottom-0 py-[6px] md:py-8">
            <div className="group pointer-events-auto ml-auto flex w-fit cursor-pointer items-center rounded-full border bg-neutral-100 pr-6 hover:bg-neutral-200">
              {data?.images?.map((image, index, images) => (
                <Image
                  key={index}
                  src={image.asset?.url || ""}
                  alt={"TODO"}
                  width="100"
                  height="100"
                  className={cn(
                    "h-20 w-20 rounded-full border-8 border-neutral-100 object-cover group-hover:border-neutral-200",
                    {
                      "-ml-8 transition-[margin-left] group-hover:-ml-6": index > 0,
                    },
                  )}
                  style={{ zIndex: images.length - index, transitionDuration: `${(index + 0.2) * 120}ms` }}
                />
              ))}
              <div className="ml-4">
                <Heading size="sm" className="mb-0 mt-1">
                  Unser Team
                </Heading>
                <Label className="text-neutral-200-text-muted">Ansehen</Label>
              </div>
              <ChevronsDownIcon className="ml-6" />
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default CampusPage;
