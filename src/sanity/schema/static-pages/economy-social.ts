import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { ShuffleIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createStringValidation } from "~/sanity/lib/validations";

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
        name: "headingUpper",
        title: "Obere Überschrift",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "headingLower",
        title: "Untere Überschrift",
        type: "string",
        validation: createStringValidation("heading"),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
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
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "content",
        title: "Inhalt",
        type: "defaultPortableContent",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "educationalProgramTypesCTA",
        title: "Links zu den Bildungswegen",
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
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Wirtschaft & Soziales" }),
    },
  }),
};
