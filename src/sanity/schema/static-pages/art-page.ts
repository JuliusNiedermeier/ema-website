import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PaletteIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createArrayValidation, createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "heading",
        title: "Überschrift",
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
        name: "readMoreLabel",
        title: "Mehr lesen Text",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "preview",
        title: "Vorschau",
        type: "object",
        validation: (r) => r.required(),
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
        validation: createArrayValidation([2, 10]),
        of: [
          defineField({
            name: "art-subject",
            title: "Kunstfach",
            type: "object",
            validation: (r) => r.required(),
            fields: [
              defineField({
                name: "title",
                title: "Name des Kunstfaches",
                description: getSizeString("heading", "Zeichen"),
                type: "string",
                validation: createStringValidation("heading"),
              }),

              defineField({
                name: "slogan",
                title: "Slogan",
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

              defineField({
                name: "image",
                title: "Bild",
                type: "default-image",
                validation: (r) => r.required(),
              }),
            ],
            preview: {
              select: {
                title: "title",
                subtitle: "slogan",
                media: "image",
              },
            },
          }),
        ],
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
      prepare: () => ({ title: "Kunst" }),
    },
  }),
};
