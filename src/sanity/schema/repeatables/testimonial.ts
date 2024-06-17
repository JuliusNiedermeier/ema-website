import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const testimonial: SchemaTypeDef = {
  definition: defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
      defineField({ name: "stars", title: "Stars", type: "number" }),
      defineField({ name: "testimonial", title: "Testimonial", type: "text" }),
      defineField({ name: "authorImage", title: "Author image", type: "image" }),
      defineField({ name: "authorName", title: "Author name", type: "string" }),
    ],
  }),
};
