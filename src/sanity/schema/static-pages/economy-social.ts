import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { ShuffleIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const economySocialPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "economy-social-page",
    title: "Wirtschaft & Soziales",
    type: "document",
    icon: ShuffleIcon,
    groups: [],
    fields: [
      navigationLabel,

      defineField({
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "headingUpper",
        title: "Obere Überschrift",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "headingLower",
        title: "Untere Überschrift",
        description: getSizeString("heading", "Zeichen"),
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        description: getSizeString("description", "Zeichen"),
        type: "text",
        validation: createStringValidation("description"),
      }),

      defineField({
        name: "teaserImage",
        title: "Vorschaubild",
        type: "default-image",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "content",
        title: "Inhalt",
        type: "defaultPortableContent",
      }),

      defineField({
        name: "educationalProgramTypesCTA",
        title: "Links zu den Bildungswegen",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
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
    ],
    preview: {
      prepare: () => ({ title: "Wirtschaft & Soziales" }),
    },
  }),
};
