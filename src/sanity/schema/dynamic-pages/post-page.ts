import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { PenLineIcon } from "lucide-react";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

export const postPage: SchemaTypeDef = {
  type: "dynamic-page",
  definition: defineType({
    name: "post-page",
    title: "Blogbeitrag",
    type: "document",
    icon: PenLineIcon,
    groups: [],
    fields: [
      defineField({
        name: "authorPrefix",
        title: "Autor-Präfix",
        description: getSizeString("label", "Zeichen. Text vor dem Namen des Autors. Zum Beispiel 'Geschrieben von'"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "datePrefix",
        title: "Datums-Präfix",
        description: getSizeString(
          "label",
          "Zeichen. Text vor dem Veröffentlichungsdatum des Beitrags. Zum Beispiel 'Am'",
        ),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "relatedPosts",
        title: "Vorschau ähnlicher Blogbeiträge",
        description: "Bereich am Ende des Beitrags mit einer Vorschau drei ähnlicher Blogbeiträge.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "heading",
            title: "Überschrift",
            description: getSizeString("label", "Zeichen. Überschrift des Bereichs."),
            type: "string",
            validation: createStringValidation("label"),
          }),

          defineField({
            name: "allPostsLabel",
            title: "Text des Links auf alle Blogbeiträge",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),
        ],
      }),
    ],
    preview: {
      prepare: () => ({ title: "Blogbeitrag" }),
    },
  }),
};
