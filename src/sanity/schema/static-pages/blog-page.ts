import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { LayoutListIcon } from "lucide-react";

export const blogPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "blog-page",
    title: "Blogbeiträge",
    type: "document",
    icon: LayoutListIcon,
    groups: [],
    fields: [
      defineField({
        name: "latestPostLabel",
        title: "Text über dem neuesten Blogbeitrag",
        description: "5-30 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),
      defineField({
        name: "placeholder",
        title: "Platzhalter",
        description: "Inhalte die angezeigt werden, wenn keine veröffentlichte Blogbeiträge vorhanden sind.",
        type: "object",
        fields: [
          defineField({
            name: "preHeading",
            title: "Kurzer Text über der Überschrift",
            type: "string",
          }),
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
      prepare: () => ({ title: "Blogbeiträge" }),
    },
  }),
};
