import { defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const testimonial: SchemaTypeDef = {
  definition: defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
      { name: "stars", title: "Stars", type: "number" },
      { name: "testimonial", title: "Testimonial", type: "text" },
      { name: "authorImage", title: "Author image", type: "image" },
      { name: "authorName", title: "Author name", type: "string" },
    ],
  }),
};
