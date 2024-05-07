import { ComponentProps, FC } from "react";
import { Card } from "../primitives/card";
import { AuthorTag, AuthorTagImage, AuthorTagName } from "../primitives/author-tag";
import { StarRating } from "./star-rating";
import { Paragraph } from "../primitives/typography";

export type TestimonialCardCoreProps = {
  rating: number;
  authorName: string;
  authorImage: ComponentProps<typeof AuthorTagImage>["src"];
  body: string;
};

export type TestimonialCardProps = TestimonialCardCoreProps & ComponentProps<typeof Card>;

export const TestimonialCard: FC<TestimonialCardProps> = ({ rating, authorName, authorImage, body, ...restProps }) => {
  return (
    <Card {...restProps}>
      <StarRating rating={[rating, 5]} />
      <Paragraph className="mt-8">{body}</Paragraph>
      <AuthorTag className="mt-8">
        <AuthorTagImage src={authorImage as any} alt={authorName} />
        <AuthorTagName>{authorName}</AuthorTagName>
      </AuthorTag>
    </Card>
  );
};
