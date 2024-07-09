import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PenLineIcon } from "lucide-react";

export const postPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "post-page",
    title: "Blogbeitragsseite",
    type: "document",
    icon: PenLineIcon,
    groups: [],
    fields: [
      defineField({
        name: "metadata",
        title: "Author & Datum",
        type: "object",
        fields: [
          defineField({
            name: "authorPrefix",
            title: "Autor-Präfix",
            description: "Text vor dem Namen des Autors. Zum Beispiel 'Geschrieben von'",
            type: "string",
          }),
          defineField({
            name: "datePrefix",
            title: "Datums-Präfix",
            description: "Text vor dem Veröffentlichungsdatum des Beitrags. Zum Beispiel 'Am'",
            type: "string",
          }),
        ],
      }),
      defineField({
        name: "relatedPosts",
        title: "Vorschau ähnlicher Blogbeiträge",
        description: "Bereich am Ende des Beitrags mit einer Vorschau drei ähnlicher Blogbeiträge.",
        type: "object",
        fields: [
          {
            name: "heading",
            title: "Überschrift",
            description: "5-20 Zeichen. Überschrift des Bereichs.",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
          {
            name: "allPostsLabel",
            title: "Text des Links auf alle Blogbeiträge",
            description: "5-20 Zeichen.",
            type: "string",
            validation: (r) => r.required().min(5).max(20),
          },
        ],
      }),
      defineField({
        name: "educationalProgramTypes",
        title: "Bildungswege",
        description: "Liste aller Bildungswege am Ende des Beitrags.",
        type: "object",
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: "3-40 Zeichen",
            type: "string",
            validation: (r) => r.required().min(3).max(40),
          }),
          defineField({
            name: "description",
            title: "Beschreibung",
            description: "50-200 Zeichen",
            type: "text",
            validation: (r) => r.required().min(50).max(200),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Blogbeitragsseite" }),
    },
  }),
};
