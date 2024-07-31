import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PaletteIcon } from "lucide-react";

export const artPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "art-page",
    title: "Kunst",
    type: "document",
    icon: PaletteIcon,
    groups: [],
    fields: [
      defineField({
        name: "heading",
        title: "Überschrift",
        type: "string",
        validation: (r) => r.required().min(5).max(40),
      }),
      defineField({
        name: "background",
        title: "Hintergrundgrafik",
        type: "image",
      }),
      defineField({
        name: "preview",
        title: "Vorschau",
        type: "object",
        fields: [
          defineField({
            name: "excerpt",
            title: "Auszug",
            type: "text",
            validation: (r) => r.required().min(50).max(300),
          }),
          defineField({
            name: "readMoreButtonLabel",
            title: "Mehr lesen Text",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          }),
          defineField({
            name: "backgroundImage",
            title: "Hintergrundbild",
            type: "image",
            validation: (r) => r.required(),
          }),
          defineField({ name: "leftImage", title: "Bild links", type: "image", validation: (r) => r.required() }),
          defineField({ name: "rightImage", title: "Bild rechts", type: "image", validation: (r) => r.required() }),
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
                name: "image",
                title: "Bild",
                type: "image",
              }),
              defineField({
                name: "description",
                title: "Beschreibung",
                type: "text",
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
