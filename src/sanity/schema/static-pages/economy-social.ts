import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { ShuffleIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

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
        validation: (r) => r.required().min(5).max(30),
      }),

      defineField({
        name: "headingLower",
        title: "Untere Überschrift",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(100).max(300),
      }),

      defineField({
        name: "teaserImage",
        title: "Vorschaubild",
        type: "default-image",
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
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
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Wirtschaft & Soziales" }),
    },
  }),
};
