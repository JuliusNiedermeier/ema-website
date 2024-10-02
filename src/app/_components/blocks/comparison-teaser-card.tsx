import { ComponentProps, FC } from "react";
import { StackedImageCard } from "../compounds/stacked-image-card";

const images: ComponentProps<typeof StackedImageCard>["images"] = [
  { url: "/comparison-learning-fields.png", alt: "Lernfelder" },
  { url: "/comparison-subjects.png", alt: "Fächer" },
  { url: "/comparison-map.svg", alt: "Bildungswege" },
];

export type ComparisonTeaserCardProps = Omit<ComponentProps<typeof StackedImageCard>, "images"> & {};

export const ComparisonTeaserCard: FC<ComparisonTeaserCardProps> = ({ ...restProps }) => {
  return <StackedImageCard images={images} {...restProps} />;
};
