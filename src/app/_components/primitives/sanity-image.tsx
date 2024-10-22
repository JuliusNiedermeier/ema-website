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

type SanityImageProps = Omit<ImageProps, "src" | "alt"> & {
  image?: Omit<DefaultImage, "_type"> | null;
};

export const SanityImage: FC<SanityImageProps> = ({ image, className, ...restProps }) => {
  if (!image?.asset) return null;

  const baseImage = imageBuilder.image(image.asset._ref).auto("format").fit("crop").quality(80);

  return <Image src={baseImage.url()} alt={image.alt || ""} className={cn("object-cover", className)} {...restProps} />;
};
