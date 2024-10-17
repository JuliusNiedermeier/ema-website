import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { LayoutListIcon } from "lucide-react";
import { navigationLabel } from "../partials/navigation-label";
import { createStringValidation, getSizeString } from "~/sanity/lib/validations";

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
        name: "seo",
        type: "seo-fields",
        validation: (r) => r.required(),
      }),

      defineField({
        name: "preHeading",
        title: "Über-Überschrift",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

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

      defineField({
        name: "latestPostLabel",
        title: "Text über dem neuesten Blogbeitrag",
        description: getSizeString("label", "Zeichen"),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "categoryFilterAllLabel",
        title: "Alle Blogbeiträge Text",
        description: getSizeString(
          "label",
          "Zeichen. Bezeichnung der Option im Kategorie-Filter um alle Blogbeiträge anzuzeigen.",
        ),
        type: "string",
        validation: createStringValidation("label"),
      }),

      defineField({
        name: "placeholder",
        title: "Platzhalter",
        description: "Inhalte die angezeigt werden, wenn keine veröffentlichte Blogbeiträge vorhanden sind.",
        type: "object",
        validation: (r) => r.required(),
        fields: [
          defineField({
            name: "preHeading",
            title: "Kurzer Text über der Überschrift",
            description: getSizeString("label", "Zeichen"),
            type: "string",
            validation: createStringValidation("label"),
          }),

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
      prepare: () => ({ title: "Blogbeiträge" }),
    },
  }),
};
