import { ComponentProps, FC } from "react";
import { TestimonialCarousel as TestimonialCarouselCompound } from "../compounds/testimonial-carousel";
import { groq } from "next-sanity";
import { sanityFetch } from "~/sanity/lib/client";
import { TestimonialsQueryResult } from "../../../../generated/sanity/types";

const testimonialsQuery = groq`*[_type == "testimonial"]{
    ...,
    authorImage{ alt, asset ->{url}}
}`;

export type TestimonialCarouselProps = Omit<ComponentProps<typeof TestimonialCarouselCompound>, "testimonials"> & {};

export const TestimonialCarousel: FC<TestimonialCarouselProps> = async ({ ...restProps }) => {
  const tesimonials = await sanityFetch<TestimonialsQueryResult>(testimonialsQuery, { tags: ["testimonial"] });

  return (
    <TestimonialCarouselCompound
      testimonials={tesimonials.map<ComponentProps<typeof TestimonialCarouselCompound>["testimonials"][number]>(
        (testimonial) => ({
          rating: testimonial.stars || 0,
          body: testimonial.testimonial || "",
          authorName: testimonial.authorName || "",
          authorImage: { url: testimonial.authorImage?.asset?.url || "", alt: testimonial.authorImage?.alt || "" },
        }),
      )}
      {...restProps}
    />
  );
};
