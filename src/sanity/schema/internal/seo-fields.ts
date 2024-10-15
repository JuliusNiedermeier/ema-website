import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createStringValidation } from "~/sanity/lib/validations";

export const seoFieldsType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "seo-fields",
    title: "SEO Metadata",
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Titel",
        type: "string",
        validation: createStringValidation("label"),
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        type: "text",
        validation: createStringValidation([70, 160]),
      }),
    ],
  }),
};
