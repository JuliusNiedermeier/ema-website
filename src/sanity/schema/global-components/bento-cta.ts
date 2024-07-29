import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { Grid2x2CheckIcon } from "lucide-react";

export const bentoCTAConfigType: SchemaTypeDef = {
  type: "global-component",
  definition: defineType({
    name: "bento-cta-config",
    title: "Bento CTA",
    type: "document",
    icon: Grid2x2CheckIcon,
    fields: [
      defineField({
        name: "primarySection",
        title: "Haupt-CTA-Bereich",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            type: "string",
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
          }),
          defineField({
            name: "buttonLabel",
            title: "Button-text",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "testimonial",
        title: "Testimonial",
        type: "reference",
        to: { type: "testimonial" },
      }),
      defineField({
        name: "personalConsultingSplineGraphic",
        title: "Grafik im Bereich der persönlichen Beratung",
        type: "image",
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bento CTA" }),
    },
  }),
};
