import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { LayoutListIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";

export const blogPage: SchemaTypeDef = {
  type: "static-page",
  definition: defineType({
    name: "blog-page",
    title: "Blogbeiträge",
    type: "document",
    icon: LayoutListIcon,
    groups: [],
    fields: [
      navigationLabel,
      defineField({
        name: "preHeading",
        title: "Über-Überschrift",
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

      defineField({
        name: "latestPostLabel",
        title: "Text über dem neuesten Blogbeitrag",
        description: "5-30 Zeichen",
        type: "string",
        validation: (r) => r.required().min(5).max(30),
      }),

      defineField({
        name: "categoryFilterAllLabel",
        title: "Alle Blogbeiträge Text",
        description: "Bezeichnung der Option im Kategorie-Filter um alle Blogbeiträge anzuzeigen",
        type: "string",
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
