import { defineField, defineType } from "sanity";
import { SchemaTypeDef } from "..";
import { MapPinIcon } from "lucide-react";

export const economySocialPage: SchemaTypeDef = {
  singleton: true,
  definition: defineType({
    name: "economy-social-page",
    title: "Wirtschaft & Soziales",
    type: "document",
    icon: MapPinIcon,
    groups: [],
    fields: [
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
        name: "previewText",
        title: "Auszug",
        type: "text",
        validation: (r) => r.required().min(100).max(300),
      }),
      defineField({
        name: "previewReadMoreLabel",
        title: "Mehr lesen Text",
        type: "string",
        validation: (r) => r.required().min(5).max(20),
      }),
    ],
    preview: {
      prepare: () => ({ title: "Wirtschaft & Soziales" }),
    },
  }),
};
