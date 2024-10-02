import { ComponentProps, FC } from "react";
import { Card } from "../primitives/card";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "../primitives/author-tag";
import { StarRating } from "./star-rating";
import { Paragraph } from "../primitives/typography";
import { cn } from "~/app/_utils/cn";

export type TestimonialCardCoreProps = {
  rating: number;
  authorName: string;
  authorImage: ComponentProps<typeof AuthorTagImage>["src"];
  body: string;
};

export type TestimonialCardProps = TestimonialCardCoreProps & ComponentProps<typeof Card>;

export const TestimonialCard: FC<TestimonialCardProps> = ({
  rating,
  authorName,
  authorImage,
  body,
  className,
  ...restProps
}) => {
  return (
    <Card
      className={cn(
        "grid grid-rows-[min-content_1fr_min-content] border border-primary-900 bg-primary-100 pt-10",
        className,
      )}
      {...restProps}
    >
      <StarRating rating={[rating, 5]} className="opacity-80" />
      <Paragraph className="mt-8">{body}</Paragraph>
      <AuthorTag className="mt-8">
        <AuthorTagImage src={authorImage} alt={authorName} />
        <AuthorTagName>{authorName}</AuthorTagName>
      </AuthorTag>
    </Card>
  );
};
