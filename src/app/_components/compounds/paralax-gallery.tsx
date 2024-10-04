import { ComponentProps, FC } from "react";
import { cn } from "~/app/_utils/cn";
import { ExpandableInfoCard, ExpandableInfoCardListProvider } from "./expandable-info-card";
import { Container } from "../primitives/container";
import { ParalaxContainer } from "./paralax-image";
import { Paragraph } from "../primitives/typography";
import Image from "next/image";

export type ParalaxGalleryProps = ComponentProps<"div"> & {
  items: {
    image: { url: string; alt: string };
    heading: string;
    subheading: string;
    description: string;
  }[];
};

export const ParalaxGallery: FC<ParalaxGalleryProps> = ({ className, items, ...restProps }) => {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...restProps}>
      <ExpandableInfoCardListProvider>
        {items.map((item, index) => (
          <div key={index} className="relative h-[75vh]">
            <div className="absolute left-0 top-0 h-full w-full">
              <Container width="wide" className="h-full overflow-hidden rounded-3xl">
                <ParalaxContainer className="h-full w-full">
                  <Image
                    src={item.image.url}
                    alt={item.image.alt}
                    width="1920"
                    height="1080"
                    className="h-full w-full overflow-hidden object-cover"
                  />
                </ParalaxContainer>
              </Container>
            </div>
            <div className="absolute bottom-0 left-0 w-full">
              <Container className="py-[6px] md:py-8">
                <ExpandableInfoCard title={item.heading} subtitle={item.subheading}>
                  <Paragraph>{item.description}</Paragraph>
                </ExpandableInfoCard>
              </Container>
            </div>
          </div>
        ))}
      </ExpandableInfoCardListProvider>
    </div>
  );
};
