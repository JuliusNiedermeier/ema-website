import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";

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
      }),
      defineField({
        name: "mainHeading",
        title: "Haup-Überschrift",
        type: "string",
      }),
      defineField({
        name: "paragraph",
        title: "Text",
        type: "text",
      }),
      defineField({
        name: "ctaText",
        title: "Text auf dem CTA-Button",
        type: "string",
      }),
    ],
  }),
};
