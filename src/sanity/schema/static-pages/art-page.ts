import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PaletteIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const artPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "art-page",
    title: "Kunst",
    type: "document",
    icon: PaletteIcon,
    groups: [],
    fields: [
      navigationLabel,

      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),

      defineField({
        name: "teaser",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(50).max(300),
      }),

      defineField({
        name: "readMoreLabel",
        title: "Mehr lesen Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),

      defineField({
        name: "preview",
        title: "Vorschau",
        type: "object",
        fields: [
          defineField({
            name: "backgroundImage",
            title: "Hintergrundbild",
            type: "default-image",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "leftImage",
            title: "Bild links",
            type: "default-image",
            validation: (r) => r.required(),
          }),
          defineField({
            name: "rightImage",
            title: "Bild rechts",
            type: "default-image",
            validation: (r) => r.required(),
          }),
        ],
      }),

      defineField({
        name: "artSubjects",
        title: "Kunstfächer",
        type: "array",
        of: [
          defineField({
            name: "art-subject",
            title: "Kunstfach",
            type: "object",
            fields: [
              defineField({
                name: "title",
                title: "Name des Kunstfaches",
                type: "string",
              }),
              defineField({
                name: "slogan",
                title: "Slogan",
                type: "string",
              }),
              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
              }),
              defineField({
                name: "image",
                title: "Bild",
                type: "default-image",
              }),
            ],
          }),
        ],
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
      prepare: () => ({ title: "Kunst" }),
    },
  }),
};
