import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createStringValidation } from "~/sanity/lib/validations";

export const genericCTAType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "generic-cta",
    title: "Standard Call-To-Action",
    type: "object",
    fields: [
      defineField({
        name: "preHeading",
        title: "Vor-Überschrift",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "mainHeading",
        title: "Haup-Überschrift",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "paragraph",
        title: "Text",
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "ctaText",
        title: "Text auf dem CTA-Button",
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "image",
        title: "Bild",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "linkURL",
        title: "Link-URL",
        type: "string",
        validation: (r) => r.required(),
      }),
    ],
  }),
};
