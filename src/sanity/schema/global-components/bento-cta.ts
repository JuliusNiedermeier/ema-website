import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { Grid2x2CheckIcon } from "lucide-react";
import { createStringValidation } from "~/sanity/lib/validations";

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
            validation: createStringValidation("heading"),
          }),

          defineField({
            name: "description",
            title: "Beschreibung",
            type: "text",
            validation: createStringValidation("description"),
          }),

          defineField({
            name: "buttonLabel",
            title: "Button-text",
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),

      defineField({
        name: "testimonial",
        title: "Testimonial",
        type: "reference",
        to: { type: "testimonial" },
        validation: (r) => r.required(),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Bento CTA" }),
    },
  }),
};
