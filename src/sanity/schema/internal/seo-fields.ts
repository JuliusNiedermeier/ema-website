import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const seoFieldsType: SchemaTypeDef = {
  type: "internal",
  definition: defineType({
    name: "seo-fields",
    title: "SEO Metadata",
    description:
      "Titel und Beschreibung, die in Sozialen Netzwerken und Google-Suchen angezeigt werden. Gestalte sie so verlockend wie möglich, um Nutzer in sozialen Netzwerken und bei Google-Suchen zu überzeugen.",
    type: "object",
    fields: [
      defineField({
        name: "title",
        title: "Titel",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        description: getSizeString([70, 160], "Zeichen"),
        type: "text",
        validation: createStringValidation([70, 160]),
      }),
    ],
  }),
};
