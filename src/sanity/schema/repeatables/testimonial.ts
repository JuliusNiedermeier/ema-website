import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

export const testimonial: SchemaTypeDef = {
  definition: defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    fields: [
      defineField({ name: "stars", title: "Sternebewertung", type: "number" }),
      defineField({ name: "testimonial", title: "Zitat", type: "text" }),
      defineField({ name: "authorImage", title: "Bild des Autors", type: "image" }),
      defineField({ name: "authorName", title: "Name des Authors", type: "string" }),
    ],
  }),
};
