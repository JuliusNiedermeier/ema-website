import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MessageSquareMoreIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

export const testimonial: SchemaTypeDef = {
  type: "dynamic-content",
  definition: defineType({
    name: "testimonial",
    title: "Testimonial",
    type: "document",
    icon: MessageSquareMoreIcon,
    fields: [
      defineField({
        name: "stars",
        title: "Sternebewertung",
        description: "Testimonials mit weniger als 3 Sternen sollten nicht auf der Seite platziert werden.",
        type: "number",
        options: { list: [3, 4, 5], layout: "radio" },
        validation: (r) => r.required(),
      }),

      defineField({
        name: "testimonial",
        title: "Text",
        description: "100-500 Zeichen",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "authorName",
        title: "Name des Autors",
        description: "3-30 Zeichen",
        type: "string",
        validation: createStringValidation("name"),
      }),

      defineField({
        name: "authorImage",
        title: "Bild des Autors",
        description: "Optional. Alternativ werden die Initialen des Autors angezeigt.",
        type: "default-image",
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      select: { title: "testimonial", subtitle: "authorName" },
      prepare: ({ title, subtitle }) => ({
        title: `${(title satisfies string).slice(0, 30)}...`,
        subtitle,
      }),
    },
  }),
};
