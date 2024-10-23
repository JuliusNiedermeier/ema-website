import Image, { ImageProps } from "next/image";
import { FC } from "react";
import createImageUrlBuilder from "@sanity/image-url";
import { env } from "~/env";
import { DefaultImage } from "../../../../generated/sanity/types";
import { cn } from "~/app/_utils/cn";

const imageBuilder = createImageUrlBuilder({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET,
});

export type SanityImageData = Omit<DefaultImage, "_type">;

type SanityImageProps = Omit<ImageProps, "src" | "alt"> & {
  image?: SanityImageData | null;
};

export const SanityImage: FC<SanityImageProps> = ({ image, className, ...restProps }) => {
  if (!image?.asset) return null;

  let baseImage = imageBuilder.image(image.asset._ref).auto("format").fit("crop").quality(80);

  if (restProps.height) {
    baseImage.height(typeof restProps.height === "string" ? parseInt(restProps.height) : restProps.height);
  }

  if (restProps.width) {
    baseImage.height(typeof restProps.width === "string" ? parseInt(restProps.width) : restProps.width);
  }

  return <Image src={baseImage.url()} alt={image.alt || ""} className={cn("object-cover", className)} {...restProps} />;
};
