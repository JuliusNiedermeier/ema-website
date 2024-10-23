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
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),
      defineField({
        name: "description",
        title: "Beschreibung",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),
    ],
  }),
};
